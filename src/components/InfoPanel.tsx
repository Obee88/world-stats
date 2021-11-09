import React from 'react';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import NumberFormater from './NumberFormater';
import { getCountryData } from '../data/countryData';
import { getSelectedCountryId } from '../state/selectors';
import './InfoPanel.css';

const InfoPanel = () => {
  const selectedCountryId = useSelector(getSelectedCountryId);
  const countryData = getCountryData(selectedCountryId);
  return (
    <Draggable>
      <div className="InfoPanel" >
        <div className="InfoHeader" > 
          {!countryData && <span>Select country on map</span>}
          {countryData?.name}
        </div>
        <div className="InfoBody">
          {countryData && (
            <img className="InfoFlag" width="50" height="30" src={countryData?.flag?.flag} />
          )}
          {countryData && countryData.info && (
            <table>
              <tbody>
                { countryData.info.continent &&
                  <tr>
                    <td className="InfoKey" >Continent:</td>
                    <td className="InfoValue">{countryData.info['continent']}</td>
                  </tr> }

                { countryData.info.region &&
                  <tr>
                    <td className="InfoKey" >Region:</td>
                    <td className="InfoValue">{countryData.info['region']}</td>
                  </tr> }

                { countryData.info['government type'] &&
                  <tr>
                    <td className="InfoKey" >Government type:</td>
                    <td className="InfoValue">{countryData.info['government type']}</td>
                  </tr> }

                { countryData.info['independent since'] &&
                  <tr>
                    <td className="InfoKey" >Independent since:</td>
                    <td className="InfoValue">{countryData.info['independent since']}.</td>
                  </tr> }

                { countryData.info['capital city'] &&
                  <tr>
                    <td className="InfoKey" >Capital:</td>
                    <td className="InfoValue">{countryData.info['capital city']}</td>
                  </tr> }

                { countryData.info['currency name'] && 
                  <tr>
                    <td className="InfoKey" >Currency:</td>
                    <td className="InfoValue">{countryData.info['currency name']} {countryData.info['currency code'] && (<span>({countryData.info['currency code']})</span>)}</td>
                  </tr> }

                { countryData.info['phone prefix'] &&
                  <tr>
                    <td className="InfoKey" >Phone:</td>
                    <td className="InfoValue">{countryData.info['phone prefix']}</td>
                  </tr> }

                { countryData.info.population &&
                  <tr>
                    <td className="InfoKey" >Population:</td>
                    <td className="InfoValue"><NumberFormater number={countryData.info['population']} /></td>
                  </tr> }

                { countryData.info['surface area'] &&
                  <tr>
                    <td className="InfoKey" >Area:</td>
                    <td className="InfoValue"><NumberFormater number={countryData.info['surface area']} /> square km</td>
                  </tr> }

                { countryData.info.costline &&
                  <tr>
                    <td className="InfoKey" >Coastline:</td>
                    <td className="InfoValue">
                      <NumberFormater
                        number={parseFloat(countryData.info['costline'])}
                      />
                      km
                    </td>
                  </tr> }

                { countryData.info.elevation &&
                  <tr>
                    <td className="InfoKey" >Elevation:</td>
                    <td className="InfoValue">
                      <NumberFormater
                        number={parseFloat(countryData.info['elevation'])}
                      />
                      m
                    </td>
                  </tr> }

                { countryData.info.languages &&
                  <tr>
                    <td className="InfoKey" >Languages:</td>
                    <td className="InfoValue">{countryData.info['languages'].join(', ')}</td>
                  </tr> }

                { countryData.info['average temperature'] &&
                  <tr>
                    <td className="InfoKey" >Avg temp:</td>
                    <td className="InfoValue">{countryData.info['average temperature']['temperature']} {countryData.info['average temperature']['measurement']}</td>
                  </tr> }

                { countryData.info['life expectancy'] &&
                  <tr>
                    <td className="InfoKey" >Life duration:</td>
                    <td className="InfoValue">{countryData.info['life expectancy']}</td>
                  </tr> }

                { countryData.info['average male height'] &&
                  <tr>
                    <td className="InfoKey" >Male height:</td>
                    <td className="InfoValue">{countryData.info['average male height']}m</td>
                  </tr> }
                { countryData.info['national dish'] &&
                  <tr>
                    <td className="InfoKey" >Dish:</td>
                    <td className="InfoValue">{countryData.info['national dish']}</td>
                  </tr> }
              </tbody>
            </table> 
          )}
        </div>
      </div>
    </Draggable>
  );
}

export default InfoPanel;
