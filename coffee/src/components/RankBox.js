import React, {Component} from 'react';

export default class RankBox extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="single-menu">
                        <div className="title-div justify-content-between d-flex">
                            <h4>{this.props.name}</h4>
                            <p className="price float-right">
                                {this.props.count}
                            </p>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

