import {useRoute} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedStackScreenProps,
} from '../../../navigation/types';
import React from 'react';
import {ICalibration} from '../../../recoil/interface';
import {format} from 'date-fns';
import {useRecoilValue} from 'recoil';
import {instrumentState} from '../../../recoil/atoms';

export type CalibrationEditModel = {
  dateString: string;
  timeString: string;
  instrumentString: string;
  rlsString: string;
  visibleRLS: boolean;
  mptString: string;
  visibleMPT: boolean;
};
export default function useCalibrationItem() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [calibration, setCalibration] = React.useState<ICalibration | null>(
    null,
  );
  const route =
    useRoute<
      AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITCALIBRATION>['route']
    >();

  const {instrumentRLM, instrumentMPT} = useRecoilValue(instrumentState);

  React.useEffect(() => {
    if (route.params.item) {
      setLoading(false);
      setCalibration(route.params.item);
    }
  }, [route]);

  const dateString = React.useMemo(
    () =>
      format(
        new Date(
          calibration?.caliDate ? new Date(calibration?.caliDate) : new Date(),
        ),
        'yyyy-MM-dd',
      ),
    [calibration?.caliDate],
  );
  const timeString = React.useMemo(
    () =>
      format(
        new Date(
          calibration?.caliDate ? new Date(calibration?.caliDate) : new Date(),
        ),
        'kk:mm:ss',
      ),
    [calibration?.caliDate],
  );

  const item: CalibrationEditModel = React.useMemo(() => {
    return {
      dateString,
      timeString,
      instrumentString: 'ddd',
      rlsString: 'ddd',
      visibleRLS: false,
      mptString: 'dsdfdfs',
      visibleMPT: false,
    };
  }, [dateString, timeString]);

  return {loading, error, item, dateString, timeString};
}
