import {
    Row,
    Col,
    Card,
    Button
} from "react-bootstrap";
import NewsService from "./NewsService";
import ApiSpinner from "../decoration/ApiSpinner";
import { News } from "../../models/News";

const NewsWidget = (props: {showFull: boolean}) => {
    const {
        news,
        newsError
    } = NewsService();

    const renderNewsCards = () => {
        if(news === undefined) {
            return (
                <ApiSpinner
                    animation="border"
                    textAlign="center"
                />
            );
        }
        if(newsError) {
            return (
                <div style={{fontSize: "20px", marginTop: "8px", textAlign: "center"}}> Could not fetch news 😵 </div>
            );
        }
        let selectedNews: News[] = props.showFull ? news : news.slice(0, 8);
        return (
            <Row>
                {selectedNews.map((article: News) => {
                    return (
                        <Col sm={6} md={4} lg={3} key={article.id} style={{marginBottom: "25px"}}>
                            <a 
                                className="clickable-card"
                                href={article.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration:"none",color:"black"}}
                            >
                                <Card style={{height: "100%"}}>
                                    <Card.Img variant="top" src={article.imageUrl} style={{height: "200px"}} />
                                    <Card.Body>
                                        <Card.Title> {article.source} </Card.Title>
                                        <Card.Text> {article.title} </Card.Text>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    );
                })}
            </Row>
        );
    }

    return (
        <div> 
            <Row>
                <Col xs={8}>
                    <h4> 📰 Trending Automotive News </h4>
                </Col>
                <Col xs={4} style={{textAlign: "right"}}>
                    {props.showFull ?
                        <span><i> Updated daily </i>🔄</span>
                    :
                        <span></span>
                    }
                </Col>
            </Row>
            
            <br/>
            {renderNewsCards()} 
            {props.showFull ?
                <div></div>
            :
                <div style={{textAlign: "center"}}>
                    <Button size="lg" variant="link" onClick={() => window.location.href = "/news"}> See All </Button>
                </div>
            }
        </div>
    );
}

export default NewsWidget;