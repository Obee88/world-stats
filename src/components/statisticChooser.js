import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { getOptions } from '../data/statistics.js';
import './statisticChooser.css';

const StatisticChooser = ({ selectedOption, handleOptionChange }) => (
  <Draggable>
    <div className="StatisticChooser" >
      <form >
        {
          [...getOptions(),'none'].map(
            (option) => (
               <div className="radio" key={option}>
                <label>
                  <input type="radio" value={option} 
                        checked={selectedOption === option} 
                        onChange={handleOptionChange} />
                    {option}
                </label>
              </div>
            )
          )
        }
      </form>
    </div>    
  </Draggable>
);

StatisticChooser.propTypes = {
  selectedOption: PropTypes.string,
  handleOptionChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedOption: state.selectedStatistic,
});

const mapDispatchToProps = (dispatch) => ({
  handleOptionChange(e) {
    dispatch({ type: "statistic-selected", data: e.target.value });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticChooser);
