import React from 'react';
import { ContactUsData } from '../../interface/contact-us';
import parse from 'html-react-parser';
import { isMobile } from '../../utils/helper';

const NutritionistId = 5;
const TopicSection = ({
  data, topic, setToggleTopic, toggleTopic, selectedIds,
  setSelectedIds
}) => {

  return (
    <div className="topic-selected topic-d-block topic-sec-space fadeAnimation">
      {toggleTopic && (
        <>
          <p className="topic-head">Select a topic:</p>
          {data.map((topic: ContactUsData, index) => {
            return (
              <span key={index}>
                <input
                  type="radio"
                  className="topic-radio"
                  id={topic.topic}
                  name="sub-topic-list"
                  value={selectedIds?.length > 0 ? selectedIds[0] : ''}
                  onClick={(e) => {
                    if (topic.link) {
                      // redirect to chat page for desktop users
                      if (topic.id == NutritionistId && !isMobile()) {
                        window.open('https://www.oziva.in/pages/chat?nc_source=nc_contact_us')
                      } else {
                        window.open(topic.link)
                      }
                    } else {
                      setToggleTopic(false);
                      setSelectedIds([topic.id]); // store top-level id
                    }
                  }}
                  key={topic.id}
                />
                <label htmlFor={topic.topic} className={`topic-btn ${topic.link ? 'topic-link' : ''}`}>
                  {parse(topic.topic)}
                </label>
              </span>
            );
          })}
        </>
      )}
      {topic && (
        <>
          <p className="topic-head">Topic: {topic.topic}</p>
          <div className="topic-list-btn selected-topic">
            <a href="#" className="topic-btn active">
              {topic.topic}
            </a>
            <a
              className="change-topic"
              onClick={() => {
                setToggleTopic(true);
                setSelectedIds([]);
              }}
            >
              Change
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default TopicSection;
