import {AppContext} from './../../../libs/contexts/AppProvider';
import {userState} from './../../../recoil/atoms/user';
import {IInspection} from '../../../recoil/interface';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {useFocusEffect} from '@react-navigation/native';
import {
  workListState,
  poleListState,
  locationListState,
  settingState,
} from '../../../recoil/atoms';
import {request} from '../../../utils';

export type AdditionalAcceptedType = {
  workNumberText: string;
  zoneText: string;
  locationText: string;
  poleIdText: string;
  testDateText: string;
  viText: string;
  rlmText: string;
  mptText: string;
};
export type FilterQuery = {
  zoneText: string[];
  locationText: string[];
  poleIdText: string[];
};

export const initialQuery = {
  zoneText: [],
  locationText: [],
  poleIdText: [],
};

export default function useAcceptedInspection() {
  const [reload, setReload] = React.useState(false);
  const [reverse, setReverse] = React.useState(false);
  const [acceptedInpectionList, setAcceptedInpectionList] = React.useState<
    (IInspection & AdditionalAcceptedType)[]
  >([]);
  const [filteredAcceptedInspectionList, setFilteredAcceptedInspectionList] =
    React.useState<(IInspection & AdditionalAcceptedType)[]>([]);
  const [sortText, setSortText] = React.useState<
    keyof AdditionalAcceptedType | null
  >(null);
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
      const filterListByPoleId: (IInspection & AdditionalAcceptedType)[] = [];
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
          const newValue: AdditionalAcceptedType = {
            workNumberText: workNumber?.woNumber || '',
            zoneText,
            locationText: locationItem?.locationName || '',
            poleIdText: poleItem?.poleidName || '',
            testDateText: item.inspectionDate || '',
            viText: item.poleBase ? item.poleBase : '',
            rlmText: item.lossMassClass ? item.lossMassClass.toString() : '',
            mptText: item.magneticDefect || '',
          };
          filterListByPoleId.push({...item, ...newValue});
        }
      });

      setAcceptedInpectionList(filterListByPoleId);
      setFilteredAcceptedInspectionList(filterListByPoleId);
    },
    [locationList, paramZone, poleList, workList],
  );

  const fetchAcceptedInspectList = React.useCallback(async () => {
    try {
      const dataList = await request<IInspection[]>(
        `${defaultURL}/api/inspectionstatus/accepted`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      filterProcess(dataList);
    } catch (error) {
      console.log(`${defaultURL}/api/inspectionstatus/begin failed`, error);
    }
  }, [defaultURL, filterProcess]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchAcceptedInspectList();
      }
    }, [fetchAcceptedInspectList, user]),
  );
  const sort = (text: keyof AdditionalAcceptedType) => {
    setSortText(text);
    setReverse(!reverse);
    setReload(true);
  };
  React.useEffect(() => {
    if (reload && sortText) {
      let data = acceptedInpectionList;
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
          case 'viText':
            indexA = a.viText.toUpperCase();
            indexB = b.viText.toUpperCase();
            break;
          case 'rlmText':
            indexA = a.rlmText.toUpperCase();
            indexB = b.rlmText.toUpperCase();
            break;
          case 'mptText':
            indexA = a.mptText.toUpperCase();
            indexB = b.mptText.toUpperCase();
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
      setSortText(null);
      setAcceptedInpectionList(sortArray);
    }
  }, [acceptedInpectionList, reload, reverse, sortText]);

  const filter = (query: FilterQuery) => {
    setFiltered(true);
    setFilterQuery(query);
  };

  React.useEffect(() => {
    if (filtered) {
      let filteredData = acceptedInpectionList;

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
      setFilteredAcceptedInspectionList(filteredData);
    }
  }, [acceptedInpectionList, filterQuery, filtered, reload, reverse, sortText]);

  return {
    user,
    acceptedInpectionList,
    filteredAcceptedInspectionList,
    sort,
    filter,
  };
}
