import {useState, useEffect} from 'react';
import ResouceCrudClient, {Resource} from '../services/ResouceCrudClient';
interface useResouceProps {
  resourceName: Resource
}

const useResource = (resourceName: Resource) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    ResouceCrudClient.list(resourceName).then((response) => setList(response['data']));
  }, []);

  return {list}
}

export default useResource;
