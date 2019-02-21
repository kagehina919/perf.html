/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './FilterNavigatorBar.css';

type Props = {|
  +className: string,
  +items: string[],
  +onPop: number => *,
  +selectedItem: number,
  +uncommittedItem?: string,
|};

class FilterNavigatorBar extends PureComponent<Props> {
  _onLiClick = (e: SyntheticMouseEvent<HTMLLIElement>) => {
    const element = e.currentTarget;
    const index = parseInt(element.dataset.index, 10) || 0;
    this.props.onPop(index);
  };

  render() {
    const { className, items, selectedItem, uncommittedItem } = this.props;
    return (
      <TransitionGroup
        component="ol"
        className={classNames('filterNavigatorBar', className)}
      >
        {items.map((item, i) => (
          <CSSTransition
            key={i}
            classNames="filterNavigatorBarTransition"
            timeout={300}
          >
            <li
              data-index={i}
              className={classNames('filterNavigatorBarItem', {
                filterNavigatorBarRootItem: i === 0,
                filterNavigatorBarBeforeSelectedItem: i === selectedItem - 1,
                filterNavigatorBarSelectedItem: i === selectedItem,
                filterNavigatorBarLeafItem: i === items.length - 1,
              })}
              title={item}
              onClick={this._onLiClick}
            >
              <button type="button" className="filterNavigatorBarItemContent">
                {item}
              </button>
            </li>
          </CSSTransition>
        ))}
        {uncommittedItem ? (
          <CSSTransition
            key={items.length}
            classNames="filterNavigatorBarUncommittedTransition"
            timeout={0}
          >
            <li
              className={classNames(
                'filterNavigatorBarItem',
                'filterNavigatorBarLeafItem',
                'filterNavigatorBarUncommittedItem'
              )}
              title={uncommittedItem}
            >
              <span className="filterNavigatorBarItemContent">
                {uncommittedItem}
              </span>
            </li>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    );
  }
}

export default FilterNavigatorBar;
