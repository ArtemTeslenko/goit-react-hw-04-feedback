import PropTypes from 'prop-types';
import React, { useState } from 'react';
import feedbackOptions from '../Utils/feedbackOptions.json';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import { StatisticsTitle } from './Statistics/Statistics.styled';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = e => {
    const target = e.target.name;

    if (target === 'good') {
      setGood(state => state + 1);
    }
    if (target === 'neutral') {
      setNeutral(state => state + 1);
    }
    if (target === 'bad') {
      setBad(state => state + 1);
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const check = countTotalFeedback();
    if (check) {
      return Math.floor((good / countTotalFeedback()) * 100);
    } else {
      return 0;
    }
  };

  return (
    <div className="mainContainer">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={handleIncrement}
        />
        <StatisticsTitle>Statistics</StatisticsTitle>
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

App.propTypes = {
  test: PropTypes.string,
  feedbackOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
