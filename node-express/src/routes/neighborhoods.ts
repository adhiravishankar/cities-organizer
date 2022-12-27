import {
  deleteNeighborhood,
  editNeighborhood,
  getAllNeighborhoods,
  getNeighborhood,
  getNeighborhoodPics,
  insertNeighborhood,
  uploadNeighborhoodPics,
} from '../controllers/NeighborhoodController';
import router from './metro';

router.get('/neighborhoods', getAllNeighborhoods);
router.post('/neighborhoods', insertNeighborhood);
router.get('/neighborhoods/:neighborhood', getNeighborhood);
router.put('/neighborhoods/:neighborhood', editNeighborhood);
router.delete('/neighborhoods/:neighborhood', deleteNeighborhood);
router.get('/neighborhoods/:neighborhood/pics', getNeighborhoodPics);
router.put('/neighborhoods/:neighborhood/upload', uploadNeighborhoodPics);

export default router;
