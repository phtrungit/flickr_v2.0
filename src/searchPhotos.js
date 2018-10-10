import React, {Component} from 'react'
import axios from 'axios'
import Gallery from 'react-grid-gallery';
import InfiniteScroll from 'react-infinite-scroller';

export default class searchPhotos extends Component {

    // set initial state of elements
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            hasMoreItems: true,
        }
    }

    componentDidMount() {
    }
    loadMore = (page) => {
        let _this = this;
        const images=[];
        const reqsize=[];

        axios({
            method:'get',
            url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7f3bf9e919ffdb73d9c1bc1b5b641411&per_page=20&tags=cat&page=1&format=json&nojsoncallback=1',
            params: {
                page: page,
                tags: this.props.match.params.tag,
                api_key:process.env.REACT_APP_API_KEY
            },
            responseType:'json'
        })
            .then( (result) => {
                let items=result.data.photos.photo;
                return Promise.all(items.map((item, index) => {
                    return axios({
                        method:'get',
                        url:'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=286f1cd4e6363ab5fa482e031e5b0465&photo_id=30244261387&format=json&nojsoncallback=1',
                        params: {
                            photo_id: item.id,
                            api_key:process.env.REACT_APP_API_KEY
                        },
                        responseType:'json'
                    })
                        .then((response) => {
                            images.push({
                                "src": _this.imageURL(item),
                                "thumbnail": _this.imageURL(item),
                                thumbnailWidth: response.data.sizes.size.width,
                                thumbnailHeight: response.data.sizes.size.height,
                                caption: item.title
                            });
                            return item
                        });
                }));

            }).then (()=>{
            _this.setState({
                items: [..._this.state.items,...images],
            })
        }).catch((error) => {
            console.log(error);
        })
    };

    // assemble image URL
    imageURL(item) {
        return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
    }




    // render the app
    render() {

        const loader = <div className="loader">Loading ...</div>;

        const images =
            this.state.items.map((i) => {
                i.customOverlay = (
                    <div style={captionStyle}>
                        <div>{i.caption}</div>
                    </div>);
                return i;
            });

        return (
            <div>
                <p id="title">
                    {this.props.match.params.tag}
                </p>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}

                >
                    <div style={{
                        display: "block",
                        minHeight: "1px",
                        width: "100%",
                        border: "1px solid #ddd",
                        overflow: "auto"
                    }}>
                        <Gallery
                            images={images}
                            enableLightbox={false}
                            enableImageSelection={false}/>
                    </div>
                </InfiniteScroll>
            </div>

        )
    }
}
const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};
