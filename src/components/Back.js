import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

export const Back = () => {
    let history = useHistory();
    return (
        <>
          <Button variant='primary' onClick={() => history.goBack()}>Go back</Button>
        </>
    );
};
 export default Back;