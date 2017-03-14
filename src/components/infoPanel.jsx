import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { getCountryData } from '../data/countryData.js';
import './infoPanel.css';
import NumberFormater from './numberFormater.jsx';

const InfoPanel = ({ selectedCountryId }) => {
  const countryData = getCountryData(selectedCountryId);
  return (
    <Draggable>
      <div className="InfoPanel" >
        <div className="InfoHeader" > 
          {
            !countryData && <span>Select country on map</span>
          }
          {
            countryData && countryData.name
          }
        </div>
        <div className="InfoBody">
          {
            countryData && <img className="InfoFlag" width="50" height="30" src={countryData.flag.flag} />
          }
          {
            countryData && countryData.info &&
            ( <table>
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
                      <td className="InfoKey" >Capital city:</td>
                      <td className="InfoValue">{countryData.info['capital city']}</td>
                    </tr> }

                  { countryData.info['currency name'] && 
                    <tr>
                      <td className="InfoKey" >Currency:</td>
                      <td className="InfoValue">{countryData.info['currency name']} {countryData.info['currency code'] && (<span>({countryData.info['currency code']})</span>)}</td>
                    </tr> }

                  { countryData.info['phone prefix'] &&
                    <tr>
                      <td className="InfoKey" >Phone prefix:</td>
                      <td className="InfoValue">{countryData.info['phone prefix']}</td>
                    </tr> }

                  { countryData.info.population &&
                    <tr>
                      <td className="InfoKey" >Population:</td>
                      <td className="InfoValue"><NumberFormater number={countryData.info['population']} /></td>
                    </tr> }

                  { countryData.info['surface area'] &&
                    <tr>
                      <td className="InfoKey" >Surface area:</td>
                      <td className="InfoValue"><NumberFormater number={countryData.info['surface area']} /> square km</td>
                    </tr> }

                  { countryData.info.costline &&
                    <tr>
                      <td className="InfoKey" >Costline:</td>
                      <td className="InfoValue"><NumberFormater number={countryData.info['costline']} /> km</td>
                    </tr> }

                  { countryData.info.elevation &&
                    <tr>
                      <td className="InfoKey" >Elevation:</td>
                      <td className="InfoValue"><NumberFormater number={countryData.info['elevation']} /> m</td>
                    </tr> }

                  { countryData.info.languages &&
                    <tr>
                      <td className="InfoKey" >Languages:</td>
                      <td className="InfoValue">{countryData.info['languages'].join(', ')}</td>
                    </tr> }

                  { countryData.info['average temperature'] &&
                    <tr>
                      <td className="InfoKey" >Average temperature:</td>
                      <td className="InfoValue">{countryData.info['average temperature']['temperature']} {countryData.info['average temperature']['measurement']}</td>
                    </tr> }

                  { countryData.info['life expectancy'] &&
                    <tr>
                      <td className="InfoKey" >Life expectancy:</td>
                      <td className="InfoValue">{countryData.info['life expectancy']}</td>
                    </tr> }

                  { countryData.info['average male height'] &&
                    <tr>
                      <td className="InfoKey" >Average male height:</td>
                      <td className="InfoValue">{countryData.info['average male height']}m</td>
                    </tr> }
                  { countryData.info['national dish'] &&
                    <tr>
                      <td className="InfoKey" >National dish:</td>
                      <td className="InfoValue">{countryData.info['national dish']}</td>
                    </tr> }
                </tbody>
              </table> 
            )
          }
        </div>
      </div>
    </Draggable>
  );
}

InfoPanel.propTypes = {
  value: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedCountryId: state.selectedStateId,
});


export default connect(
  mapStateToProps
)(InfoPanel);
