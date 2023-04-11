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
  userListState,
  settingState,
} from '../../../recoil/atoms';
import {FilterQuery, initialQuery} from '../types';
import {request} from '../../../utils';

export type AdditionalBeginType = {
  workNumberText: string;
  zoneText: string;
  locationText: string;
  poleIdText: string;
  inspectorText: string;
};

export default function useBeginInspection() {
  const [reload, setReload] = React.useState(false);
  const [reverse, setReverse] = React.useState(false);
  const [sortText, setSortText] = React.useState<
    keyof AdditionalBeginType | null
  >(null);
  const [beginInpectionList, setBeginInpectionList] = React.useState<
    (IInspection & AdditionalBeginType)[]
  >([]);
  const [filteredBeginInspectionList, setFilteredBeginInspectionList] =
    React.useState<(IInspection & AdditionalBeginType)[]>([]);
  const [filtered, setFiltered] = React.useState(false);
  const [filterQuery, setFilterQuery] =
    React.useState<FilterQuery>(initialQuery);

  const {paramZone} = useRecoilValue(settingState);
  const poleList = useRecoilValue(poleListState);
  const workList = useRecoilValue(workListState);
  const locationList = useRecoilValue(locationListState);
  const userList = useRecoilValue(userListState);

  const user = useRecoilValue(userState);
  const {defaultURL} = React.useContext(AppContext);

  const filterProcess = React.useCallback(
    (data: IInspection[]) => {
      const filterListByPoleId: (IInspection & AdditionalBeginType)[] = [];
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
          const inspectorItem = userList.find(
            element => item.inspectorid === element._id,
          );
          const newValue: AdditionalBeginType = {
            workNumberText: workNumber?.woNumber || '',
            zoneText,
            locationText: locationItem?.locationName || '',
            poleIdText: poleItem?.poleidName || '',
            inspectorText:
              inspectorItem?.firstName + ' ' + inspectorItem?.lastName,
          };
          filterListByPoleId.push({...item, ...newValue});
        }
      });

      setBeginInpectionList(filterListByPoleId);
      setFilteredBeginInspectionList(filterListByPoleId);
      console.log('begin inspection list length..', filterListByPoleId.length);
    },
    [locationList, paramZone, poleList, userList, workList],
  );

  const fetchBeginInspectList = React.useCallback(async () => {
    try {
      const dataList = await request<IInspection[]>(
        `${defaultURL}/api/inspectionstatus/begin`,
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
      console.log(`${defaultURL}/api/inspectionstatus/begin failed`, error);
    }
  }, [defaultURL, filterProcess, user?._id, user?.userId]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchBeginInspectList();
      }
    }, [fetchBeginInspectList, user]),
  );

  const sort = (text: keyof AdditionalBeginType) => {
    setSortText(text);
    setReverse(!reverse);
    setReload(true);
  };
  React.useEffect(() => {
    if (reload) {
      let data = beginInpectionList;
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
          case 'inspectorText':
            indexA = a.inspectorText.toUpperCase();
            indexB = b.inspectorText.toUpperCase();
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
      setBeginInpectionList(sortArray);
    }
  }, [beginInpectionList, reload, reverse, setReload, sortText]);

  const filter = (query: FilterQuery) => {
    setFiltered(true);
    setFilterQuery(query);
  };

  React.useEffect(() => {
    if (filtered) {
      let filteredData = beginInpectionList;

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
      setFilteredBeginInspectionList(filteredData);
    }
  }, [beginInpectionList, filterQuery, filtered, reload, reverse, sortText]);

  return {
    user,
    beginInpectionList,
    filteredBeginInspectionList,
    sort,
    filter,
  };
}
