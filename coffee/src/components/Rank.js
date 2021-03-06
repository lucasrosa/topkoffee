import React, {Component} from 'react';
import RankBox from './RankBox.js';

export default class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.ranks = props.ranks;
    }

    handleUpdate(ranks) {
        this.setState({ranks: ranks});
    }      

    render() {
        const ranks = this.state.ranks;
        // Sort the array
        ranks.sort((a, b) => b.count > a.count);
        // Create the boxes
        const rankBoxes = ranks.map((rank, index) => 
            <RankBox key={index} position={index+1} name={rank.name} count={rank.count}/>
        );
        
        return (
            <div>{rankBoxes}</div>
        );
    }
}

