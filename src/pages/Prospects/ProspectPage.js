import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Dropdown, Spinner, Tab, Tabs } from 'react-bootstrap';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { APP_URLS } from '../../helpers/routers';
import { getProspect } from '../../graphql/queries';
import './ProspectPage.scss';
import ProspectListTab from '../../components/IndividualProspect/ProspectListTab';
import Messages from '../../components/IndividualProspect/Messages';
import ProspectDetailsTab from '../../components/IndividualProspect/ProspectDetailsTab';
import ProspectDemographicTab from '../../components/IndividualProspect/ProspectDemographicTab';
import ProspectHomeTab from '../../components/IndividualProspect/ProspectHomeTab';

import { updateProspect } from '../../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import ComingSoon from '../../components/layout/ComingSoon';
import {
  INTEREST_STATUS,
  INTEREST_STATUSES,
} from '../../helpers/interestStatus';

const ProspectPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [interested, setInterested] = useState(INTEREST_STATUS.UNKNOWN);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const f = async () => {
      if (id) {
        try {
          setLoading(true);
          const rt = await API.graphql(
            graphqlOperation(getProspect, { id: id })
          );
          if (rt.data.getProspect) {
            let item = rt.data.getProspect;
            setData(item);
          }
        } catch (err) {}
        setLoading(false);
      }
    };
    f();
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (data) {
      if (INTEREST_STATUSES.includes(data.status)) {
        setInterested(data.status);
      } else {
        setInterested(INTEREST_STATUS.UNKNOWN);
      }
    }
  }, [data]);
  const changeInterested = (value) => {
    setInterested(value);
    updateData({ status: value });
  };
  const updateData = async (newDt) => {
    const newData = {
      ...data,
      ...newDt,
    };
    try {
      setData(newData);
      const putData = { ...newData };
      delete putData.prospectList;
      delete putData.createdAt;
      delete putData.updatedAt;
      await API.graphql(graphqlOperation(updateProspect, { input: putData }));
      toast.success('Updated successfully.', { hideProgressBar: true });
    } catch (err) {
      toast.error('Failed to update item.', { hideProgressBar: true });
    }
  };
  return (
    <>
      <ToastContainer />
      <NavLink
        className='d-flex align-items-center mb-4 font-weight-bold'
        to={{ pathname: APP_URLS.PROSPECTS, search: location.search }}
      >
        <img
          src='/assets/icons/chevron-left-blue.svg'
          className='mr-2'
          alt='back'
        />
        BACK TO PROSPECT LIST
      </NavLink>
      <div className='d-flex flex-wrap'>
        <div className='prospect-card'>
          <div className='card p-4'>
            {loading && (
              <div className='d-flex align-items-center justify-content-center p-5'>
                <Spinner size='lg' animation='border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              </div>
            )}
            {data && (
              <>
                <div className='d-flex justify-content-between flex-wrap mb-3'>
                  <h4>{data.firstName + ' ' + data.lastName}</h4>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='interested'
                      variant='link'
                      id='dropdown-basic'
                    >
                      <span>{interested}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='interested-menu'>
                      {INTEREST_STATUSES.map((item, idx) => (
                        <Dropdown.Item
                          key={idx}
                          className={interested === item ? 'active' : ''}
                          onClick={() => changeInterested(item)}
                        >
                          {item}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='mb-4'>
                  <div className='summary-item'>
                    Prospect List <span>{data.prospectList.name}</span>
                  </div>
                  <div className='summary-item'>
                    Marketing Attempts <span>{2}</span>
                  </div>
                  <div className='summary-item'>
                    Last Attempt{' '}
                    <span>{new Date(data.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Tabs defaultActiveKey='list' id='uncontrolled-tab-example'>
                  <Tab eventKey='list' title='LIST'>
                    <ProspectListTab
                      data={data}
                      changeData={(event) => updateData(event)}
                    />
                  </Tab>
                  <Tab eventKey='details' title='DETAILS'>
                    <ProspectDetailsTab data={data} />
                  </Tab>
                  <Tab eventKey='demographics' title='DEMOGRG.'>
                    <ProspectDemographicTab data={data} />
                  </Tab>
                  <Tab eventKey='home' title='HOME'>
                    <ProspectHomeTab data={data} />
                  </Tab>
                </Tabs>
              </>
            )}
          </div>
        </div>
        <div className='message-card'>
          <div className='card p-4 position-relative'>
            <ComingSoon />
            <Messages />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProspectPage;
