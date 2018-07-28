import React from "react";

export default class Following extends React.Component {
  render() {
    const mappedItems = this.props.items
      .filter(item => item.channel.followers < this.props.count)
      .map((item, key) => {
        return (
          <li key={key}>
            {item.channel.name}: {item.channel.followers}
          </li>
        );
      });
    return (
      <div>
        <ul>{mappedItems}</ul>
      </div>
    );
  }
}
