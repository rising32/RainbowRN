import {useFocusEffect} from '@react-navigation/native';
import {AppContext} from './../../../libs/contexts/AppProvider';
import {userState} from './../../../recoil/atoms/user';
import {IInspection} from '../../../recoil/interface';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {
  workListState,
  poleListState,
  locationListState,
  settingState,
} from '../../../recoil/atoms';
import {FilterQuery, initialQuery} from '../types';
import {request} from '../../../utils';

export type AdditionalRejectedType = {
  workNumberText: string;
  zoneText: string;
  locationText: string;
  poleIdText: string;
  testDateText: string;
  rejectReasonText: string;
};

export default function useRejectedInspection() {
  const [reload, setReload] = React.useState(false);
  const [reverse, setReverse] = React.useState(false);
  const [sortText, setSortText] = React.useState<
    keyof AdditionalRejectedType | null
  >(null);
  const [rejectedInpectionList, setRejectedInpectionList] = React.useState<
    (IInspection & AdditionalRejectedType)[]
  >([]);
  const [filteredRejectedInspectionList, setFilteredRejectedInspectionList] =
    React.useState<(IInspection & AdditionalRejectedType)[]>([]);
  const [filtered, setFiltered] = React.useState(false);
  const [filterQuery, setFilterQuery] =
    React.useState<FilterQuery>(initialQuery);

  const {defaultURL} = React.useContext(AppContext);
  const {paramZone} = useRecoilValue(settingState);
  const poleList = useRecoilValue(poleListState);
  const workList = useRecoilValue(workListState);
  const locationList = useRecoilValue(locationListState);
  const user = useRecoilValue(userState);

  const filterProcess = React.useCallback(
    (data: IInspection[]) => {
      const filterListByPoleId: (IInspection & AdditionalRejectedType)[] = [];
      data.map(item => {
        const poleItem = poleList.find(pole => item.poleid === pole._id);

        if (poleItem) {
          const workNumber = workList.find(work => item.wonoid === work._id);
          const locationItem = locationList.find(
            location => poleItem?.poleidLocation === location._id,
          );
          const zoneText = locationItem
            ? paramZone[locationItem?.locationZone]
            : '';
          const newValue: AdditionalRejectedType = {
            workNumberText: workNumber?.woNumber || '',
            zoneText,
            locationText: locationItem?.locationName || '',
            poleIdText: poleItem?.poleidName || '',
            testDateText: item.inspectionDate || '',
            rejectReasonText: item.rejectReason || '',
          };
          filterListByPoleId.push({...item, ...newValue});
        }
      });

      setRejectedInpectionList(filterListByPoleId);
      setFilteredRejectedInspectionList(filterListByPoleId);
      console.log(
        'rejected inspection list length..',
        filterListByPoleId.length,
      );
    },
    [locationList, paramZone, poleList, workList],
  );

  const fetchRejectedInspectList = React.useCallback(async () => {
    try {
      const dataList = await request<IInspection[]>(
        `${defaultURL}/api/inspectionstatus/rejected`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const id = user?._id || user?.userId;
      const filterData = dataList.filter(item => item.inspectorid === id);
      filterProcess(filterData);
    } catch (error) {
      console.log(`${defaultURL}/api/inspectionstatus/rejected failed`, error);
    }
  }, [defaultURL, filterProcess, user?._id, user?.userId]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchRejectedInspectList();
      }
    }, [fetchRejectedInspectList, user]),
  );
  const sort = (text: keyof AdditionalRejectedType) => {
    setSortText(text);
    setReverse(!reverse);
    setReload(true);
  };
  React.useEffect(() => {
    if (reload) {
      let data = rejectedInpectionList;
      const sortArray = data.sort((a, b) => {
        let indexA: string = '';
        let indexB: string = '';

        switch (sortText) {
          case 'workNumberText':
            indexA = a.workNumberText.toUpperCase();
            indexB = b.workNumberText.toUpperCase();
            break;
          case 'zoneText':
            indexA = a.zoneText.toUpperCase();
            indexB = b.zoneText.toUpperCase();
            break;
          case 'locationText':
            indexA = a.locationText.toUpperCase();
            indexB = b.locationText.toUpperCase();
            break;
          case 'poleIdText':
            indexA = a.poleIdText.toUpperCase();
            indexB = b.poleIdText.toUpperCase();
            break;
          case 'testDateText':
            indexA = a.testDateText.toUpperCase();
            indexB = b.testDateText.toUpperCase();
            break;
          case 'rejectReasonText':
            indexA = a.rejectReasonText.toUpperCase();
            indexB = b.rejectReasonText.toUpperCase();
            break;
          default:
            console.log('Sorry, we are out of title.');
        }

        if (indexA === undefined || indexB === undefined) {
          return 0;
        }

        if (indexA < indexB) {
          return reverse ? -1 : 1;
        }
        if (indexA > indexB) {
          return reverse ? 1 : -1;
        }
        return 0;
      });
      setReload(false);
      setRejectedInpectionList(sortArray);
    }
  }, [rejectedInpectionList, reload, reverse, sortText]);

  const filter = (query: FilterQuery) => {
    setFiltered(true);
    setFilterQuery(query);
  };

  React.useEffect(() => {
    if (filtered) {
      let filteredData = rejectedInpectionList;

      if (filterQuery.zoneText.length > 0) {
        filterQuery.zoneText.map(e1 => {
          filteredData = filteredData.filter(
            element => element.zoneText === e1,
          );
        });
      }
      if (filterQuery.locationText.length > 0) {
        filterQuery.locationText.map(e1 => {
          filteredData = filteredData.filter(
            element => element.locationText === e1,
          );
        });
      }
      if (filterQuery.poleIdText.length > 0) {
        filterQuery.poleIdText.map(e1 => {
          filteredData = filteredData.filter(
            element => element.poleIdText === e1,
          );
        });
      }

      setFiltered(false);
      setFilterQuery(initialQuery);
      setFilteredRejectedInspectionList(filteredData);
    }
  }, [rejectedInpectionList, filterQuery, filtered, reload, reverse, sortText]);

  return {
    user,
    rejectedInpectionList,
    filteredRejectedInspectionList,
    sort,
    filter,
  };
}
