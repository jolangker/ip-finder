import axios from "axios";

export interface GeoLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}

export function useGeo() {
  const fetching = ref<boolean>(false);
  const geoLocation = ref<GeoLocation>({} as GeoLocation);

  const getGeoLocation = async (IPAddress: string, callback: Function) => {
    fetching.value = true;
    try {
      const res = await axios.get<GeoLocation>(`https://ipinfo.io/${IPAddress}/geo`);
      geoLocation.value = res.data;
      callback();
    } catch (error) {
      console.log(error);
    } finally {
      fetching.value = false;
    }
  };

  const lngLat = computed<number[]>(() => {
    if (geoLocation.value.loc) {
      const locArray = geoLocation.value.loc.split(",");
      const convertLoc = locArray.map((loc) => parseInt(loc));
      const lngLat = convertLoc.reverse();
      return lngLat;
    } else return [0, 0];
  });

  return {
    fetching,
    geoLocation,
    getGeoLocation,
    lngLat,
  };
}
