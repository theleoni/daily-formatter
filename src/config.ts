
// import he from 'he';
import he = require('he');

export const XMP_OPTIONS = {
	attributeNamePrefix : "@_",
	attrNodeName: "attr", // default is 'false'
	textNodeName : "#text",
	ignoreAttributes : true,
	ignoreNameSpace : false,
	allowBooleanAttributes : false,
	parseNodeValue : true,
	parseAttributeValue : false,
	trimValues: true,
	cdataTagName: "__cdata", // default is 'false'
	cdataPositionChar: "\\c",
	parseTrueNumberOnly: false,
	arrayMode: false, // "strict"
	attrValueProcessor: (val: any) => he.decode(val, {isAttributeValue: true}),// default is a=>a
	tagValueProcessor : (val: any) => he.decode(val), // default is a=>a
	stopNodes: ["parse-me-as-string"]
};
