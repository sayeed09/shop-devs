import React from 'react';
import { Moengage } from '../../utils/tracking/gaTracking';
import DescriptionSection from './description-section';
import { Subtopic, Topic } from '../../interface/contact-us';

interface Props {
  topic: Topic | undefined;
  register: any;
  handleReset: () => void;
  attachMentName: any;
  setAttachmentToken: any;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const SubTopicSection = ({
  topic,
  register,
  handleReset,
  attachMentName,
  setAttachmentToken,
  selectedIds,
  setSelectedIds,
}: Props) => {
  const subtopics = topic?.subtopics || [];

  const getCurrentLevelSubtopics = () => {
    let current: Subtopic[] = subtopics;

    // skip [0] top-level topic id
    for (const id of selectedIds.slice(1)) {
      const found = current.find((s) => s.id === id);
      if (!found) break;
      current = found.subtopics || [];
    }
    return current;
  };

  const getSelectedRoute = () => {
    let route: Subtopic[] = [];
    let currentList = subtopics;

    for (const id of selectedIds.slice(1)) {
      const node = currentList.find((s) => s.id === id);
      if (!node) break;
      route.push(node);
      currentList = node.subtopics || [];
    }
    return route;
  };

  const handleSelect = (subtopic: Subtopic, level: number) => {
    if (subtopic.link) {
      Moengage.track_event(
        `limechat_websource_${subtopic.title.replace(/\s+/g, '_').toLowerCase()}`
      );
      window.open(subtopic.link);
      return;
    }
    // level+1 top-level topic id
    const newPath = [...selectedIds.slice(0, level + 1), subtopic.id];
    setSelectedIds(newPath);
  };

  const handleChange = (level: number) => {
    setSelectedIds(selectedIds.slice(0, level + 1));
  };
  const renderDescription = (sub: Subtopic) => {
    if (sub.title === 'Collaboration') {
      return (
        <p>
          For any collaboration related queries, please email us at{' '}
          <a href="mailto:partner@oziva.in">partner@oziva.in</a>
        </p>
      );
    }

    if (['Order Delivery Status', 'Order Delayed'].includes(sub.title)) {
      return (
        <>
          <DescriptionSection
            hasAttachment={sub.hasAttachment}
            message={sub.message}
            register={register}
            handleReset={handleReset}
            attachMentName={attachMentName}
            setAttachmentToken={setAttachmentToken}
            sub={sub}
          />
          <p className="text-center mt-16">OR</p>
          <h5>
            You can also track your order here:{' '}
            <a href="./order-history">
              <span style={{ color: '#6BBD58' }}>TRACK ORDER</span>
            </a>
          </h5>
        </>
      );
    }

    return (
      <>
        <DescriptionSection
          hasAttachment={sub.hasAttachment}
          message={sub.message}
          register={register}
          handleReset={handleReset}
          attachMentName={attachMentName}
          setAttachmentToken={setAttachmentToken}
          sub={sub}
        />

      </>

    );
  };

  const route = getSelectedRoute();
  const currentLevelSubs = getCurrentLevelSubtopics();
  const lastSelected = route[route.length - 1];

  return (
    <div>
      {route.map((sub, idx) => (
        <div key={sub.id}>
          <p className="topic-head">
            Sub topic for "{idx === 0 ? topic?.topic : route[idx - 1].title}"
          </p>
          <div className="topic-list-btn selected-topic">
            <a className="topic-btn active">{sub.title}</a>
            <a className="change-topic" onClick={() => handleChange(idx)}>
              Change
            </a>
          </div>
        </div>
      ))}

      {currentLevelSubs.length > 0 && (
        <>
          <p className="topic-head">
            {route.length === 0
              ? `Select sub topic for "${topic?.topic}"`
              : `Select sub topic for "${lastSelected?.title}"`}
          </p>
          <div className="sub-topic-group">
            {currentLevelSubs.map((sub) => (
              <div className="sub-topic-list" key={sub.id}>
                <input
                  type="radio"
                  id={sub.id.toString()}
                  name={`level-${route.length + 1}`}
                  value={sub.title}
                  onClick={() => handleSelect(sub, route.length)}
                  checked={selectedIds[route.length + 1] === sub.id}
                />
                <label htmlFor={sub.id.toString()}>{sub.title}</label>
              </div>
            ))}
          </div>
        </>
      )}

      {/* render Description no subtopics present */}
      {currentLevelSubs.length === 0 && lastSelected && renderDescription(lastSelected)}
    </div>
  );
};

export default SubTopicSection;