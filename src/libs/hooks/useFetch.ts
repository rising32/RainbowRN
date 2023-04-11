import {useRecoilValue} from 'recoil';
import {configState} from '../../recoil/atoms';

export default function useFetch() {
  const defaultURL = useRecoilValue(configState);
  async function request<TResponse>(
    url: string,
    config: RequestInit,
  ): Promise<TResponse> {
    const response = await fetch(defaultURL + url, config);
    return await response.json();
  }

  return {
    request,
  };
}
