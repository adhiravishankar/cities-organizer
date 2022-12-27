import {
  deleteMetro, editMetro, getAllMetros, getMetro, getMetroPics, insertMetro, uploadMetroPics,
} from '../controllers/MetroController';
import router from './router';

router.get('/metros', getAllMetros);
router.post('/metros', insertMetro);
router.get('/metros/:metro', getMetro);
router.put('/metros/:metro', editMetro);
router.delete('/metros/:metro', deleteMetro);
router.get('/metros/:metro/pics', getMetroPics);
router.put('/metros/:metro/upload', uploadMetroPics);

export default router;
