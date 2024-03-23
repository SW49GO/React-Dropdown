"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _fa = require("react-icons/fa");
var config = _interopRequireWildcard(require("./Config.js"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function DropdownReact(_ref) {
  let {
    data,
    onSelect,
    sortAZ,
    sortNum,
    initialOption,
    styleContainer: customContainer,
    styleHeader: customHeader,
    styleContainerList: customContainerList,
    styleList: customList,
    bckColorOverList,
    colorTextOverList
  } = _ref;
  // State to Open and Close DropDown
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const toggleDropDown = () => setIsOpen(!isOpen);

  // Config Style 
  const SelectConfig = config.defaultConfig;
  let mergedStyleContainer = {
    ...SelectConfig.styleContainer,
    ...customContainer
  };
  const openStyle = {
    borderRadius: '.3125rem .3125rem 0 0'
  };
  let mergedStyleHeader = {
    ...SelectConfig.styleHeader,
    ...customHeader
  };
  if (isOpen) {
    mergedStyleHeader = {
      ...mergedStyleHeader,
      ...openStyle
    };
  }
  let mergedStyleContainerList = {
    ...SelectConfig.styleContainerList,
    ...customContainerList
  };
  let mergedStyleList = {
    ...SelectConfig.styleList,
    ...customList
  };

  // Sort the table alphabetically if necessary
  let datas;
  if (sortAZ) {
    datas = data.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  } else if (sortNum) {
    datas = data.sort((a, b) => a.name - b.name);
  } else {
    datas = data;
  }
  // State for the option displayed by default
  const [optionSelected, setOptionSelected] = (0, _react.useState)(datas ? datas[0].name : '');
  (0, _react.useEffect)(() => {
    if (initialOption) {
      setOptionSelected(initialOption);
    }
  }, [initialOption]);

  // Function to retrieve selection
  const handleOptionSelected = option => {
    // If option is an array (for the option that contains abbreviation and name)
    if (Array.isArray(option)) {
      setOptionSelected(option[1]);
      onSelect(option[0]);
    } else {
      setOptionSelected(option);
      onSelect(option);
    }
    setIsOpen(false);
  };
  // Creating a reference for each option in the list
  const listRef = (0, _react.useRef)(null);
  // Each time the DropDown list is opened, the scroll is positioned on the default element (initialOption)
  (0, _react.useEffect)(() => {
    if (listRef.current) {
      const selectedOptionElement = listRef.current.querySelector("[data-option=\"".concat(optionSelected, "\"]"));
      if (selectedOptionElement) {
        const scrollTo = selectedOptionElement.offsetTop - listRef.current.offsetTop;
        listRef.current.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  }, [isOpen, optionSelected]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: mergedStyleContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: mergedStyleHeader,
    onClick: toggleDropDown
  }, /*#__PURE__*/_react.default.createElement("div", null, optionSelected), /*#__PURE__*/_react.default.createElement("div", null, isOpen ? /*#__PURE__*/_react.default.createElement(_fa.FaCaretUp, null) : /*#__PURE__*/_react.default.createElement(_fa.FaCaretDown, null))), isOpen && /*#__PURE__*/_react.default.createElement("div", {
    ref: listRef,
    style: mergedStyleContainerList,
    "data-testid": "dropDownList"
  }, datas.map((item, index) => /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": "option-".concat(item.name),
    "data-option": item.name,
    style: mergedStyleList,
    key: index,
    onClick: () => {
      item.abbreviation ? handleOptionSelected([item.abbreviation, item.name]) : handleOptionSelected(item.name);
    },
    onMouseOver: event => {
      event.target.style.backgroundColor = bckColorOverList || "#d3cdcd";
      event.target.style.color = colorTextOverList || mergedStyleContainerList.color;
    },
    onMouseOut: event => {
      event.target.style.backgroundColor = mergedStyleContainerList.backgroundColor;
      event.target.style.color = mergedStyleContainerList.color;
    }
  }, item.name))));
}
DropdownReact.propTypes = {
  data: _propTypes.default.array,
  onSelect: _propTypes.default.func,
  initialOption: _propTypes.default.string,
  styleContainer: _propTypes.default.object,
  styleHeader: _propTypes.default.object,
  styleContainerList: _propTypes.default.object,
  styleList: _propTypes.default.object,
  bckColorOverList: _propTypes.default.string,
  colorTextOverList: _propTypes.default.string
};
var _default = exports.default = DropdownReact;