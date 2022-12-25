import {
  deleteCity, editCity, getAllCities, getCity, getCityPics, insertCity, uploadCityPics,
} from '../controllers/CityController';
import router from './router';

router.get('/metros', getAllCities);
router.post('/metros', insertCity);
router.get('/metros/:metro', getCity);
router.put('/metros/:metro', editCity);
router.delete('/metros/:metro', deleteCity);
router.get('/metros/:metro/pics', getCityPics);
router.put('/metros/:metro/upload', uploadCityPics);

export default router;
