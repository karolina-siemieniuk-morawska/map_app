import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Geosuggest from 'react-geosuggest';

export const Header = ({ setCoordinates }) => {
  const search = <FontAwesomeIcon icon={faSearch} />;

  const onSuggestSelect = (suggest) => {
    if (suggest) {
      setCoordinates({
        lat: suggest.location.lat,
        lng: suggest.location.lng
      });
      const form = document.getElementById('form');
      form.reset();
    }
  };

  return (
    <header className="topbar">
      <p className="mb-0">Geosuggestion</p>
      <form id="geosuggestion" className="input-wrapper">
        {search}
        <Geosuggest placeholder="Country, region, city..." onSuggestSelect={onSuggestSelect} />
      </form>
    </header>
  )
};