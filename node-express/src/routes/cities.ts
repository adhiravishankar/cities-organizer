import {
  deleteCity, editCity, getAllCities, getCity, getCityPics, insertCity, uploadCityPics,
} from '../controllers/CityController';
import router from './metro';

router.get('/cities', getAllCities);
router.post('/cities', insertCity);
router.get('/cities/:city', getCity);
router.put('/cities/:city', editCity);
router.delete('/cities/:city', deleteCity);
router.get('/cities/:city/pics', getCityPics);
router.put('/cities/:city/upload', uploadCityPics);

export default router;
