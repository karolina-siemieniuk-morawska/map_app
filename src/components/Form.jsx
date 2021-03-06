import { useForm } from "react-hook-form";
import { ValidationError } from "./ValidationError";

export const Form = ({ setCoordinates }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const latRegEx = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  const lngRegEx = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  const submitCoordinates = (data) => {
    setCoordinates({
      lat: data.latitude,
      lng: data.longitude
    });
    const geosuggestion = document.getElementById('geosuggest__input');
    geosuggestion.value = null;
  }

  return (
    <form id="form" className="form d-flex flex-column px-3" onSubmit={handleSubmit(submitCoordinates)}>
      <label htmlFor="latitude" className="mb-1">
        Latitude:
      </label>
      <input type="text" name="latitude" className="mb-3" placeholder="e.g. 52.467"
        {...register("latitude", { required: true, pattern: latRegEx, maxLength: 9 })} />

      {errors.latitude && errors.latitude.type === "required" && (
        <ValidationError content=" Latitude is required" />
      )}
      {errors.latitude && errors.latitude.type === "pattern" && (
        <ValidationError content=" Latitude must be a number within a range from -90 to 90" />
      )}
      {errors.latitude && errors.latitude.type === "maxLength" && (
        <ValidationError content=" Max 6 decimal places" />
      )}

      <label htmlFor="longitude" className="mb-1">
        Longitude:
      </label>
      <input type="text" name="longitude" className="mb-3" placeholder="e.g. 23.152"
        {...register("longitude", { required: true, pattern: lngRegEx, maxLength: 10 })} />

      {errors.longitude && errors.longitude.type === "required" && (
        <ValidationError content=" Longitude is required" />
      )}
      {errors.longitude && errors.longitude.type === "pattern" && (
        <ValidationError content=" Longitude must be a number within a range from -180 to 180" />
      )}
      {errors.longitude && errors.longitude.type === "maxLength" && (
        <ValidationError content=" Max 6 decimal places" />
      )}

      <button type="submit" className="mt-4">Try</button>
    </form>
  )
};