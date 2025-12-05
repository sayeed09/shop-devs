import React, { useState } from 'react';
import FeedbackSection from '../../components/contact-us/feedback-section';
import TopicSection from '../../components/contact-us/topic-section';
import SubTopicSection from '../../components/contact-us/subtopic-section';
import { useForm } from 'react-hook-form';
import '../../scss/oziva-contact-us.scss';
import { data as ContactUsData } from '../../utils/contact-us/data';
import { IUserData, TicketData } from "../../interface/contact-us"
import { contactUsService } from '../../services/contact-us';
import { TickIcon24x24 } from '../../../icons/tickIcon24x24';
import { TrackOrderIcon } from '../../../icons/track-order-icon';
import { ConsultIcon } from '../../../icons/consult-icon';
import Booknow from '../../components/contact-us/booknow';
import NotificationModal from '../../components/contact-us/message-popup';
import { getFromCookie, setCookie } from '../../utils/product/formatter'
import Chatnow from '../../components/contact-us/chatnow';
import { Moengage } from '../../utils/tracking/gaTracking';
import MailBoxIcon from '../../../icons/mailbox';
import { getTopicsRoute } from '../../utils/contact-us/helper';

let userQueryObject: IUserData = {
  fullName: '',
  email: '',
  phone: '',
  description: '',
  topics: [],
  tags: ['web'],
};

const contactUsConditions = {
  bookNow: 8,
  chatNow: 7
};
const bookNowCondition = contactUsConditions.bookNow;
const chatNowCondition = contactUsConditions.chatNow;

const ContactUsView = () => {
  const data = ContactUsData;
  const [toggleTopic, setToggleTopic] = useState(true);
  const [showThankYouBlock, setShowThankYouBlock] = useState(false)
  const { register, handleSubmit, reset, setValue, watch, getValues } = useForm();
  const [attachMentName, setAttachMentName] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [attchmentToken, setAttachmentToken] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);



  const onSubmit = () => {
    setShowLoader(true);
    const topicsWithId = selectedIds;
    const custExistingTickets = getFromCookie('contactusQuery') || ''

    const todayEndTime = new Date();
    todayEndTime.setHours(23, 59, 59, 999).toLocaleString();
    try {
      let cookieObject
      try {
        cookieObject = custExistingTickets ? JSON.parse(custExistingTickets) : []
      } catch (error) {
        console.log("Error: ", error);
      }

      if (cookieObject?.length) {
        let isAvailable = false
        for (const item of cookieObject) {
          if (item?.topics?.toString() == topicsWithId?.toString()) {
            isAvailable = true
            break;
          }
        }

        if (isAvailable) {
          setShowLoader(false)
          setShowMessageModal(true)
          return false;
        } else {
          const newObj = { topics: topicsWithId, time: Date.now() }
          cookieObject.push(newObj);
          setCookie('contactusQuery', JSON.stringify(cookieObject), todayEndTime.toString())
        }
      } else {
        const newObj = [{ topics: topicsWithId, time: Date.now() }]
        setCookie('contactusQuery', JSON.stringify(newObj), todayEndTime.toString())
      }
      // CALL CREATE TICKET
      createCustomerQuery()
    } catch (error) {
      console.log("Error:", error);
    }
  }


  const createCustomerQuery = () => {
    const attachmentTokenList = attchmentToken.length > 0 ? attchmentToken.map(token => token.token) : [];
    let createTicketData: TicketData = {
      fullName: watch('fullName').trim(),
      email: watch('email'),
      phone: watch('phone'),
      description: watch('description').trim(),
      token: attachmentTokenList
    }
    userQueryObject.topics = getTopicsRoute(selectedIds);
    userQueryObject = { ...userQueryObject, ...createTicketData };
    contactUsService.createTicket(userQueryObject)
      .then(() => {
        setShowLoader(false)
        userQueryObject.topics = []
        createTicketData = {
          fullName: '',
          email: '',
          phone: '',
          description: '',
          token: []
        }
        reset()
        setToggleTopic(true)
        setSelectedIds([])
        setAttachMentName([])
        setAttachmentToken([])
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowThankYouBlock(true)
      })
      .catch((error) => {
        console.log('Create ticket error', error);
        setShowLoader(false)
      });
  }
  const handleReset = () => {
    reset()
    setToggleTopic(true)
    setSelectedIds([])
    setAttachMentName([])
    setAttachmentToken([])
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowLoader(false)
  }

  const handleChatwoot = () => {
    (window as any).Moengage.track_event('contact_us_consult', {});
    const event = new CustomEvent('triggerChatWoot');
    document.dispatchEvent(event);
  };

  const handleTrackOrder = () => {
    (window as any).Moengage.track_event('contact_us_consult', {});
    window.location.href = '/pages/order-history';
  }

  return (
    <>
      {showLoader && <div className="loader_wrapper"><div className="loader"></div></div>}
      {showThankYouBlock && <div className="thankyou-block">
        <div className="flex-cnt">
          <div className="tick-icon">
            <TickIcon24x24 />
          </div>
          <div className="text fs-11-14 ff-roboto">
            <strong>Thank you for reaching out!</strong>
            <div>
              <span>Our team is on it and will respond within 24 business hours. Please check your inbox or spam folder for updates.</span>
            </div>
          </div>
        </div>
      </div>}
      <div className="contact-us-container">
        <h2 className="heading">Quick Links</h2>
        <div className="quick-links-holder">
          <button className='icon-button' style={{ marginRight: '4px' }} onClick={() => handleTrackOrder()}>
            <TrackOrderIcon />
            <span>
              Track Order
            </span>
          </button>
          {/* <button className='icon-button' style={{marginLeft: '4px'}} onClick={() => handleChatwoot()}>
            <ConsultIcon/>
            <span>
              Consult
            </span>
          </button> */}
        </div>
        {showMessageModal &&
          <NotificationModal showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal} handleReset={handleReset} submitQuery={createCustomerQuery} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="feedback-section">
            <FeedbackSection register={register} />
          </div>
          <div className='how-to-use-text'>
            Confused about how to use products? <a target='_blank' href='https://help.oziva.in/hc/en-us/categories/38627410826137-Product-Guide'>CLICK HERE</a>
          </div>
          <div className="topic-section topic-list-btn fadeAnimation topic-list-btn-group">
            <TopicSection
              data={data}
              topic={selectedIds.length > 0 ? data.find((t) => t.id === selectedIds[0]) : ''}
              setToggleTopic={setToggleTopic}
              toggleTopic={toggleTopic}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
          <div className="subtopic-section topic-selected topic-d-block topic-sec-space fadeAnimation">
            {
              selectedIds && selectedIds.length > 0 && selectedIds[0] == bookNowCondition ? (
                <Booknow />
              ) :
                selectedIds.length > 0 && (
                  <SubTopicSection
                    topic={selectedIds.length > 0 ? data.find((t) => t.id === selectedIds[0]) : undefined}
                    register={register}
                    handleReset={handleReset}
                    attachMentName={attachMentName}
                    setAttachmentToken={setAttachmentToken}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                )}
          </div>
        </form>
        {/* <div className='contact-details'>
          <a href="mailto:community@oziva.in">community@oziva.in</a>
        </div> */}
        <div className="fadeAnimation topic-sec-space">
          <div>
            <h2 className="heading topic-head">Also reach us at</h2>
            <div>
              <a href="mailto:community@oziva.in" className="email-link">
                <MailBoxIcon />
                <span>community@oziva.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUsView;
