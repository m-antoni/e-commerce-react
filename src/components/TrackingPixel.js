import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TRACKING_URL =
  'https://uf2y3gwxme.execute-api.ap-southeast-1.amazonaws.com/prod/track';
const SITE = 'eshop-mern-frontend-render.onrender.com';

const TrackingPixel = () => {
  const location = useLocation();

  useEffect(() => {
    fetch(`${TRACKING_URL}?site=${SITE}&page=${location.pathname}`, {
      mode: 'no-cors',
    });
  }, [location]);

  return null;
};

export default TrackingPixel;
