import React, {Component} from 'react'
import axios from 'axios'
import Gallery from 'react-grid-gallery';
import InfiniteScroll from 'react-infinite-scroller';

export default class MediaGallery extends Component {

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
        var _this = this;
        this.serverRequest =
            axios({
                method:'get',
                url:'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=508e5061950bdf3264f3b5a171ff7292&format=json&nojsoncallback=1&per_page=20&page=0',
                params: {
                    page: page
                },
                responseType:'json'
            })
                .then(function (result) {
                    _this.setState({
                        items: [..._this.state.items,...result.data.photos.photo],
                    })
                })
    };

    // assemble image URL
    imageURL(item) {
        return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
    }

    myGallery(items) {
        var MyGallery = {
            Images: []
        };

        for (var i in items) {

            var item = items[i];

            MyGallery.Images.push({
                "src": this.imageURL(item),
                "thumbnail": this.imageURL(item),
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                caption: item.title
            });
        }

        return MyGallery.Images;
    }


    // render the app
    render() {

        const loader = <div className="loader">Loading ...</div>;

        const images =
            this.myGallery(this.state.items).map((i) => {
                i.customOverlay = (
                    <div style={captionStyle}>
                        <div>{i.caption}</div>
                    </div>);
                return i;
            });

        return (
            <div>
                <p id="title">
                    Explore
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