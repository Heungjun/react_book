import NavigateBeforeTwoTone from '@material-ui/icons/NavigateBeforeTwoTone';
import NavigateNextTwoTone from '@material-ui/icons/NavigateNextTwoTone';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'first':
            return { selectedPageIndex: 0 };
        case 'prev':
            return { selectedPageIndex: Math.max(state.selectedPageIndex - 1, 0) };
        case 'next':
            return {
                selectedPageIndex: Math.min(state.selectedPageIndex + 1, action.lastPageIndex),
            };
        case 'last':
            return { selectedPageIndex: action.lastPageIndex };
        case 'click':
            return { selectedPageIndex: action.selectedPageIndex };
        default:
            throw new Error();
    }
};
const Pagination = ({
    /**
     *  Type: Number
     *  required
     *  Description: Array.length
     */
    dataLength,

    /**
     *  Type: Number
     *  required
     *  Description: 테이블에 보여지는 row 수
     */
    rowViewCount,

    /**
     *  Type: Number
     *  Default: 3
     *  Description: Paging Number 출력 개수
     */
    indicatorViewCount = 3,

    /**
     *  Type: Number
     *  Description: 현재 선택된 Paging Index
     */
    selectedPageIndex = 0,

    /**
     *  Type: function
     *  Description: 현재 선택된 pageNumber 부모로 전달.
     */
    returnSelectedPageIndex,

    /**
     * Type: bool
     * Description: Indicator 표시 유무(true: 출력, false: 출력안함)
     */
    indicator = true,
}) => {
    const [state, dispatch] = useReducer(reducer, { selectedPageIndex: selectedPageIndex });

    useEffect(() => {
        !!returnSelectedPageIndex && returnSelectedPageIndex(state.selectedPageIndex);
    }, [state.selectedPageIndex]);

    const indicatorOnClick = useCallback((index) => {
        dispatch({ type: 'click', selectedPageIndex: index });
    }, []);

    const getLastPageIndex = () => {
        return Math.floor((dataLength - 1) / rowViewCount);
    };

    // number style
    const indicatorIconsStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer' };
    // icon style
    const indicatorNumbersStyle = { fontSize: '15px', margin: '0 5px', cursor: 'pointer' };
    // Indicator Number 홀수로 만들기.
    const indicatorViewCountOdd = indicatorViewCount - ((indicatorViewCount + 1) % 2);

    const indicatorNumber = () => {
        // selectedPageNumber 의 양쪽에 필요한 수의 개수
        let indicatorViewCountHalf = (indicatorViewCountOdd - 1) / 2;
        // 화면에 보여주는 숫자들
        let indicatorNumbers = [];
        // 범위 계산용 lastPageIndex + 1
        let lastPageNumber = getLastPageIndex() + 1;

        // selectedPageNumber 보다 작은 수가 부족한 경우
        if (state.selectedPageIndex - indicatorViewCountHalf < 0) {
            for (let i = 0; i < Math.min(indicatorViewCountOdd, lastPageNumber); i++) {
                indicatorNumbers.push(i);
            }
        }
        // selectedPageNumber 보다 큰 수가 부족한 경우
        else if (state.selectedPageIndex + indicatorViewCountHalf >= lastPageNumber) {
            for (
                let i = Math.max(lastPageNumber - indicatorViewCountOdd, 0);
                i < lastPageNumber;
                i++
            ) {
                indicatorNumbers.push(i);
            }
        }
        // 기본
        else {
            for (
                let i = Math.max(state.selectedPageIndex - indicatorViewCountHalf, 0);
                i <= Math.min(state.selectedPageIndex + indicatorViewCountHalf, lastPageNumber);
                i++
            ) {
                indicatorNumbers.push(i);
            }
        }

        return (
            <>
                {indicatorNumbers.map((index) => (
                    <div
                        key={index}
                        style={
                            index == state.selectedPageIndex
                                ? { color: 'cyan', ...indicatorNumbersStyle }
                                : { ...indicatorNumbersStyle }
                        }
                        onClick={() => indicatorOnClick(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="flex justify-end" style={{ color: '#ffffff', alignItems: 'center' }}>
            <div onClick={() => dispatch({ type: 'first' })} style={indicatorIconsStyle}>
                <SkipPrevious />
            </div>
            <div onClick={() => dispatch({ type: 'prev' })} style={indicatorIconsStyle}>
                <NavigateBeforeTwoTone />
            </div>
            {indicator && indicatorNumber()}
            <div
                onClick={() => dispatch({ type: 'next', lastPageIndex: getLastPageIndex() })}
                style={indicatorIconsStyle}
            >
                <NavigateNextTwoTone />
            </div>
            <div
                onClick={() => dispatch({ type: 'last', lastPageIndex: getLastPageIndex() })}
                style={indicatorIconsStyle}
            >
                <SkipNext />
            </div>
        </div>
    );
};

Pagination.propTypes = {
    dataLength: PropTypes.number.isRequired,
    rowViewCount: PropTypes.number.isRequired,
};

export default Pagination;
