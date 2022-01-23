import { Container } from "react-bootstrap";
import NewsWidget from "./car/NewsWidget";

const NewsPage = () => {
    return (
        <Container>
            <br/>
            <NewsWidget showFull={true} />
        </Container>
    );
}

export default NewsPage;