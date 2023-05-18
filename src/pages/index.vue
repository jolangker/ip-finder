<script setup lang="ts">
// @ts-ignore
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
import { z } from "zod";

const mapboxKey: string = import.meta.env.VITE_MAPBOX_KEY;

const { fetching, geoLocation, lngLat, getGeoLocation } = useGeo();
const { scrollToElement } = useMyScroll();

const search = ref<string>("");
const errorMessage = ref<string>("");

const resultSection = ref<HTMLElement>(null as unknown as HTMLElement);

const handleGetGeoLocation = () => {
  try {
    errorMessage.value = "";

    const ip = z.string().ip({ version: "v4" });

    ip.parse(search.value);

    getGeoLocation(search.value, () => {
      scrollToElement(resultSection.value);
    });
  } catch (error) {
    errorMessage.value = "Invalid IP Address";
  }
};
</script>

<template>
  <section class="h-screen">
    <div class="px-4 hero h-screen bg-base-100 md:px-8 lg:px-12 xl:px-16">
      <div class="hero-content text-center">
        <div class="max-w-xl">
          <h1 class="text-3xl md:text-4xl font-bold">
            Get detailed
            <span class="text-primary font-medium uppercase animate-pulse">IP insights</span>
            instantly.
          </h1>
          <p class="py-6 text-sm md:text-base">
            Track and discover valuable information about any IP address with ease.
          </p>
          <div class="flex w-full space-x-2">
            <div class="flex-grow form-control">
              <input
                v-model="search"
                type="text"
                class="input input-primary w-full input-md"
                :class="{ 'input-error': errorMessage }"
                placeholder="Enter any IP Address"
              />
              <p
                class="invisible mt-1 text-left text-xs text-error"
                :class="{ '!visible': errorMessage }"
              >
                Invalid IP Address
              </p>
            </div>
            <button
              class="btn btn-primary btn-md"
              :class="{ loading: fetching }"
              @click="handleGetGeoLocation"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section ref="resultSection" class="bg-base-200 py-24 relative">
    <div class="relative px-4 max-w-[2000px] mx-auto md:px-8 lg:px-12 xl:px-16">
      <div>
        <h2 class="text-center text-xl md:text-2xl">
          Entered IP Address <br />
          <span class="text-2xl text-primary font-medium md:text-3xl">
            {{ geoLocation.ip }}
          </span>
        </h2>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-4">
        <div>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
            <CardInfo :content="lngLat?.[0]"></CardInfo>
            <CardInfo :content="lngLat?.[1]"></CardInfo>
            <CardInfo :content="geoLocation.city"></CardInfo>
            <CardInfo :content="geoLocation.region"></CardInfo>
            <CardInfo :content="geoLocation.country"></CardInfo>
            <CardInfo :content="geoLocation.org"></CardInfo>
            <CardInfo :content="geoLocation.postal"></CardInfo>
            <CardInfo :content="geoLocation.timezone"></CardInfo>
          </div>
        </div>
        <div class="rounded aspect-square md:aspect-video xl:aspect-[3/1] overflow-hidden">
          <MapboxMap
            class="h-full"
            :access-token="mapboxKey"
            map-style="mapbox://styles/mapbox/streets-v11"
            :center="lngLat"
            :zoom="5"
          >
            <MapboxMarker :lng-lat="lngLat"> </MapboxMarker>
          </MapboxMap>
        </div>
      </div>
    </div>
  </section>
</template>
