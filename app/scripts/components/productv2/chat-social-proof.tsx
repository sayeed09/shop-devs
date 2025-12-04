import React, { useCallback, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import { getChatSocialContent, chatSocialProofIcons } from '../../utils/product/constants';

const ChatSocialProof = ({ productId }: { productId: string }) => {
  const flickityRef = React.useRef<Flickity | null>(null);
  const flickityOptions = {
    prevNextButtons: false,
    contain: false,
    pageDots: false,
    lazyLoad: 6,
    wrapAround: true,
    groupCells: true,
    initialIndex: 1,
    autoPlay: false,
  };

  const setFlickityRef = useCallback((ref: Flickity) => {
    flickityRef.current = ref;

  }, []);

  useEffect(() => {
    window.addEventListener('GCSK1654V2', function (e) {
      setTimeout(() => {
        if (flickityRef && flickityRef?.current) {
          flickityRef.current?.playPlayer();
        }
      }, 1000)
    })
  }, []);


  return (
    <>
      <div className='chat-social-proof-heading'>
        <div className='chat-social-proof-title'>Expert Guidance</div>
        <div className='chat-social-proof-subtitle'>That’s Helping Thousands Transform!</div>
      </div>
      <div className='chat-social-proof-content'>
        {/* Content goes here */}
        <Flickity
          className="carousel carousel-main"
          elementType={'div'}
          options={flickityOptions}
          reloadOnUpdate
          flickityRef={setFlickityRef}
        >
          {getChatSocialContent(productId)?.length > 0 && getChatSocialContent(productId)?.map((item, index) => {
            return (
              <div className="carousel-chat-social-proof" key={index}>
                <div className="chat-social-proof-card-image">
                  <img src={item.image} alt={item.title} />
                  <div className='chat-social-proof-highligher'>
                    <div className='text'>
                      {item.content}
                    </div>
                    <div className='name'>
                      <span>
                        {item.name},
                      </span>
                      <span className='ml-4'>
                        {item.place}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Flickity>

        <div className='chat-social-proof-icons-content'>
          <div className='chat-social-proof-icons-title'>
            Get Personalize Support - The Easy Way!
          </div>

          <div className="chat-social-proof-icons">
            {
              chatSocialProofIcons.map((item) => {
                return (
                  <div className='icons' key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className='icons-text'>
                      {item.title}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatSocialProof