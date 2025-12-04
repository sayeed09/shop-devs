import React, { useState } from 'react';
import MailBoxIcon from '../../../icons/mailbox';
import { contactUsService } from '../../services/contact-us';
import parse from 'html-react-parser';

const DescriptionSection = ({
  hasAttachment,
  message,
  register,
  handleReset,
  attachMentName,
  setAttachmentToken,
  sub
}) => {
  const [uploadAttachments, setUploadAttachments] = useState([]);
  const [errors, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const attachmentUpload = (event) => {
    setError('');
    const files = event.target.files;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.heic|\.pdf)$/i;
    if (!allowedExtensions.exec(event.target.value)) {
      event.target.value = null;
      setError('Invalid File. Please upload image or pdfs');
      return false;
    }
    if (event.target.files.length + uploadAttachments.length <= 5) {
      setLoading(true);
      const formData = new FormData();
      let uploadAtt: any[] = [];
      let fileSizes = 0;
      for (let i = 0; i < files.length; i++) {
        fileSizes += files[i].size;
        formData.append('attachment', files[i]);
        uploadAtt.push({
          name: files[i].name,
        });
      }
      const fileInMB = fileSizes / 1024 ** 2;
      if (fileInMB < 5) {
        contactUsService
          .uploadAttachment(formData)
          .then((data) => {
            data.attachment_token.map((item, index) => {
              uploadAtt[index].token = item;
            });
            const tempState = [...uploadAtt, ...uploadAttachments];
            setUploadAttachments(tempState);
            setAttachmentToken(tempState);
            setLoading(false);
          })
          .catch((error) => {
            setError(`Error while uploading file ${files[0].name}`);
            console.log('upload attachment error', error);
            setLoading(false);
          });
      } else {
        setError('Failed to upload image: Size too big');
        setLoading(false);
      }
    } else {
      setError('Failed to upload image: Maximum 5 images.');
      setLoading(false);
    }
  };

  const handleDeleteAttachment = (item) => {
    const filteredFiles = uploadAttachments.filter(
      (file) => file.token !== item.token,
    );
    setUploadAttachments(filteredFiles);
    setAttachmentToken(filteredFiles);
  };

  const handleDescription = (event) => {
    if (event.target.value.trim().length < 3) {
      setError('Please enter the description');
    } else {
      setError('');
    }
  };

  return (
    <div>
      {!sub.disableSubmit ?
        <div className="fadeAnimation">
          <div>
            <p className="topic-head">Description</p>
            <div>
              <textarea
                placeholder={message}
                className="topic-input"
                cols={30}
                rows={5}
                required
                onKeyUp={(event) => handleDescription(event)}
                {...register('description')}
              ></textarea>
            </div>
            {hasAttachment && (
              <>
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  You can upload upto 5 images(jpg/png/pdf/heic). Maximum upload
                  per file size is 1MB.
                </p>
                {uploadAttachments.length > 0 &&
                  uploadAttachments.map((item, ind) => {
                    return (
                      <div key={ind} className="uploaded">
                        <span className="fileName">{item.name}</span>
                        <span
                          className="closeIcon"
                          onClick={() => handleDeleteAttachment(item)}
                        >
                          <img src="https://cdn.shopify.com/s/files/1/2393/2199/t/10/assets/cross.png?v=170201845281379071531647514284" />
                        </span>
                      </div>
                    );
                  })}
                <>
                  {uploadAttachments.length < 5 && (
                    <div
                      className={'file-upload-wrapper'}
                      data-text={
                        'Add photo of Product Received, Invoice, Packaging(carton box)'
                      }
                    >
                      {loading ? (
                        <div
                          className="loader-coupon file-upload-loader"
                          style={{
                            position: 'absolute',
                            right: '5px',
                            top: '5px',
                            background: '#F1F8EE',
                            width: '30px',
                            height: '30px',
                          }}
                        ></div>
                      ) : (
                        <input
                          {...register('attachment')}
                          name="attachment"
                          type="file"
                          className="file-upload-field"
                          onChange={(e) => attachmentUpload(e)}
                          required={uploadAttachments.length <= 0 ? true : false}
                          accept=".jpg, .jpeg, .png, .heic, .pdf"
                          multiple
                        />
                      )}
                    </div>
                  )}
                </>
                {errors && (
                  <p style={{ color: '#D9314E', paddingBottom: '16px' }}>
                    {errors}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="topic-btn-group">
            <input
              type="reset"
              onClick={handleReset}
              className="topic-btn topic-btn-reset"
            />
            <input
              type="submit"
              className="topic-btn topic-btn-submit"
              disabled={errors ? true : false}
            />
          </div>
        </div>
        : <div className="fadeAnimation detail-msg-container">
          {parse(sub.message)}
        </div>}

    </div>
  );
};

export default DescriptionSection;
