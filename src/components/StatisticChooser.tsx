import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import { getOptions } from '../data/statistics';
import { getSelectedStatistic } from '../state/selectors';
import { selectStatistic } from '../state/actions';
import './StatisticChooser.css';

const StatisticChooser = () => {
  const dispatch = useDispatch();
  const handleStatisticChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(selectStatistic(e.currentTarget.value));
  };
  const selectedStatistic = useSelector(getSelectedStatistic);
  return (
    <Draggable>
      <div className="StatisticChooser" >
        <form >
          {
            [...getOptions(),'none'].map(
              (option) => (
                <div className="radio" key={option}>
                  <label>
                    <input
                      type="radio"
                      value={option} 
                      checked={selectedStatistic === option} 
                      onChange={handleStatisticChange}
                    />
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
};

export default StatisticChooser;
