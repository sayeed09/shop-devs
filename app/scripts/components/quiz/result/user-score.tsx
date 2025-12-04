import React, { useEffect, useState } from "react";
import { HairAnalysis, User } from "../../../models/quiz/quiz-response";
import parse from 'html-react-parser';


interface Props {
  hairAnalysis: HairAnalysis;
  user: User;
}
const UserScore = ({ user, hairAnalysis }: Props) => {
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    const hairCondition = document.getElementById('conditionSpan')?.clientWidth;
    setMarginLeft(hairCondition || 0);
  }, [])

  return <>
    <section className='homeSection quiz-dr-card-top pt-32'>
      <div className='d-flex quiz-dr-card'>
        <div className='align-item-center'>
          <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/arantxa-img.jpg?v=1707285915" alt="Backed By Science" className='w-m-100' />
        </div>
        <div>
          <p className='title'>Hi {user.name},</p>
          <p>{hairAnalysis.welcomeNote}</p>
        </div>
      </div>
    </section>
    <section className='homeSection progress-bar-section'>
      <p className="font-bold">Your Hair Score</p>
      <div className='final-progress-bar'>
        <div className='bar-text-status'>
          <span>0</span>
          <span>100</span>
        </div>
        <div className='progress-bar-strap'>
          <div className="progress-bar-percentage" style={{ width: `${hairAnalysis.score}%` }}>
            <span className="progress-bar-percentage-dtls percentage-result">{hairAnalysis.score}</span>
            <span id="conditionSpan" className="progress-bar-percentage-dtls" style={{ marginRight: `-${Number(marginLeft) / 2}px` }}>{hairAnalysis.condition}</span>
          </div>
        </div>
        <div className='result-condition'>
          <p>{parse(hairAnalysis.description)}</p>
        </div>
      </div>
      <div className="progress-bar-dtls">I recommend that you start with addressing the following underlying root-causes of your hair health.</div>
    </section>
  </>
}
export default UserScore;