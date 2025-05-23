/**
 * Model helper functions related to charts and datasets.
 */

/**
 * @param {string} currentTitle
 * @param {Array} allTitles Objects containing 'unit' and 'title'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {String} Updated title
 */
function getChartTitle(currentTitle, allTitles, selectedUnit, selectedSeries) {
  var match = getMatchByUnitSeries(allTitles, selectedUnit, selectedSeries);
  return (match) ? match.title : currentTitle;
}

/**
 * @param {string} currentType
 * @param {Array} allTypes Objects containing 'unit', 'series', and 'type'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {String} Updated type
 */
function getChartType(currentType, allTypes, selectedUnit, selectedSeries) {
  if (!currentType) {
    currentType = 'line';
  }
  var match = getMatchByUnitSeries(allTypes, selectedUnit, selectedSeries);
  return (match) ? match.type : currentType;
}

/**
 * @param {Array} graphLimits Objects containing 'unit' and 'title'
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Object|false} Graph limit object, if any
 */
function getGraphLimits(graphLimits, selectedUnit, selectedSeries) {
  return getMatchByUnitSeries(graphLimits, selectedUnit, selectedSeries);
}

/**
 * @param {Array} graphAnnotations Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphAnnotations(graphAnnotations, selectedUnit, selectedSeries, graphTargetLines, graphSeriesBreaks, graphErrorBars, graphTargetPoints, graphTargetLabels) {
  var annotations = getMatchesByUnitSeries(graphAnnotations, selectedUnit, selectedSeries);
  if (graphTargetLines) {
    annotations = annotations.concat(getGraphTargetLines(graphTargetLines, selectedUnit, selectedSeries));
  }
  if (graphSeriesBreaks) {
    annotations = annotations.concat(getGraphSeriesBreaks(graphSeriesBreaks, selectedUnit, selectedSeries));
  }
  if (graphErrorBars) {
    annotations = annotations.concat(getGraphErrorBars(graphErrorBars, selectedUnit, selectedSeries));
  }
  if (graphTargetPoints) {
    annotations = annotations.concat(getGraphTargetPoints(graphTargetPoints, selectedUnit, selectedSeries));
  }
  if (graphTargetLabels) {
    annotations = annotations.concat(getGraphTargetLabels(graphTargetLabels, selectedUnit, selectedSeries));
  }
  return annotations;
}

/**
 * @param {Array} graphTargetLines Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphTargetLines(graphTargetLines, selectedUnit, selectedSeries) {
  return getMatchesByUnitSeries(graphTargetLines, selectedUnit, selectedSeries).map(function(targetLine) {
    targetLine.preset = 'target_line';
    targetLine.label = { content: targetLine.label_content };
    return targetLine;
  });
}

/**
 * @param {Array} graphErrorBars Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphErrorBars(graphErrorBars, selectedUnit, selectedSeries) {
  return getMatchesByUnitSeries(graphErrorBars, selectedUnit, selectedSeries).map(function(errorBar) {
    errorBar.preset = 'error_bar';
    errorBar.label = { content: errorBar.label_content };
    return errorBar;
  });
}

/**
 * @param {Array} graphTargetPoints Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphTargetPoints(graphTargetPoints, selectedUnit, selectedSeries) {
  return getMatchesByUnitSeries(graphTargetPoints, selectedUnit, selectedSeries).map(function(targetPoint) {
    targetPoint.preset = 'target_point';
    return targetPoint;
  });
}

/**
 * @param {Array} graphTargetLabels Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphTargetLabels(graphTargetLabels, selectedUnit, selectedSeries) {
  return getMatchesByUnitSeries(graphTargetLabels, selectedUnit, selectedSeries).map(function(targetLabel) {
    targetLabel.preset = 'target_label';
    return targetLabel;
  });
}


/**
 * @param {Array} graphSeriesBreaks Objects containing 'unit' or 'series' or more
 * @param {String} selectedUnit
 * @param {String} selectedSeries
 * @return {Array} Graph annotations objects, if any
 */
function getGraphSeriesBreaks(graphSeriesBreaks, selectedUnit, selectedSeries) {
  return getMatchesByUnitSeries(graphSeriesBreaks, selectedUnit, selectedSeries).map(function(seriesBreak) {
    seriesBreak.preset = 'series_break';
    seriesBreak.label = { content: seriesBreak.label_content };
    return seriesBreak;
  });
}

/**
 * @param {Array} headline Rows
 * @param {Array} rows
 * @param {Array} combinations Objects representing disaggregation combinations
 * @param {Array} years
 * @param {string} defaultLabel
 * @param {Array} colors
 * @param {Array} selectableFields Field names
 * @param {Array} colorAssignments Color/striping assignments for disaggregation combinations
 * @return {Array} Datasets suitable for Chart.js
 */
function getDatasets(headline, data, combinations, years, defaultLabel, colors, selectableFields, colorAssignments, showLine, spanGaps, allObservationAttributes, mixedTypes) {
  var datasets = [], index = 0, dataset, colorIndex, color, background, border, striped, excess, combinationKey, colorAssignment, showLine, spanGaps, mixedTypes;
  var numColors = colors.length,
      maxColorAssignments = numColors * 2;
  console.log("mixeTypes in getDatasets: ", mixedTypes);
  prepareColorAssignments(colorAssignments, maxColorAssignments);
  setAllColorAssignmentsReadyForEviction(colorAssignments);

  combinations.forEach(function(combination) {
    var filteredData = getDataMatchingCombination(data, combination, selectableFields);
    if (filteredData.length > 0) {
      excess = (index >= maxColorAssignments);
      if (excess) {
        // This doesn't really matter: excess datasets won't be displayed.
        color = getHeadlineColor();
        striped = false;
      }
      else {
        combinationKey = JSON.stringify(combination);
        colorAssignment = getColorAssignmentByCombination(colorAssignments, combinationKey);
        if (colorAssignment !== undefined) {
          colorIndex = colorAssignment.colorIndex;
          striped = colorAssignment.striped;
          colorAssignment.readyForEviction = false;
        }
        else {
          if (colorAssignmentsAreFull(colorAssignments)) {
            evictColorAssignment(colorAssignments);
          }
          var openColorInfo = getOpenColorInfo(colorAssignments, colors);
          colorIndex = openColorInfo.colorIndex;
          striped = openColorInfo.striped;
          colorAssignment = getAvailableColorAssignment(colorAssignments);
          assignColor(colorAssignment, combinationKey, colorIndex, striped);
        }
      }

      color = getColor(colorIndex, colors);
      background = getBackground(color, striped);
      border = getBorderDash(striped);
      dataset = makeDataset(years, filteredData, combination, defaultLabel, color, background, border, excess, showLine, spanGaps, allObservationAttributes, mixedTypes);
      datasets.push(dataset);
      index++;
    }
  }, this);

  if (headline.length > 0) {
    dataset = makeHeadlineDataset(years, headline, defaultLabel, showLine, spanGaps, allObservationAttributes, mixedTypes);
    datasets.unshift(dataset);
  }
  return datasets;
}

/**
 * @param {Array} colorAssignments
 * @param {int} maxColorAssignments
 */
function prepareColorAssignments(colorAssignments, maxColorAssignments) {
  while (colorAssignments.length < maxColorAssignments) {
    colorAssignments.push({
      combination: null,
      colorIndex: null,
      striped: false,
      readyForEviction: false,
    });
  }
}

/**
 * @param {Array} colorAssignments
 */
function setAllColorAssignmentsReadyForEviction(colorAssignments) {
  for (var i = 0; i < colorAssignments.length; i++) {
    colorAssignments[i].readyForEviction = true;
  }
}

/**
 * @param {Array} rows
 * @param {Object} combination Key/value representation of a field combo
 * @param {Array} selectableFields Field names
 * @return {Array} Matching rows
 */
function getDataMatchingCombination(data, combination, selectableFields) {
  return data.filter(function(row) {
    return selectableFields.every(function(field) {
      return row[field] === combination[field];
    });
  });
}

/**
 * @param {Array} colorAssignments
 * @param {string} combination
 * @return {Object|undefined} Color assignment object if found.
 */
function getColorAssignmentByCombination(colorAssignments, combination) {
  //console.log("colorAssignement: ", colorAssignments);
  return colorAssignments.find(function(assignment) {
    return assignment.combination === combination;
  });
}

/**
 * @param {Array} colorAssignments
 * @return {boolean}
 */
function colorAssignmentsAreFull(colorAssignments) {
  for (var i = 0; i < colorAssignments.length; i++) {
    if (colorAssignments[i].combination === null) {
      return false;
    }
  }
  return true;
}

/**
 * @param {Array} colorAssignments
 */
function evictColorAssignment(colorAssignments) {
  for (var i = 0; i < colorAssignments.length; i++) {
    if (colorAssignments[i].readyForEviction) {
      colorAssignments[i].combination = null;
      colorAssignments[i].colorIndex = null;
      colorAssignments[i].striped = false;
      colorAssignments[i].readyForEviction = false;
      return;
    }
  }
  throw 'Could not evict color assignment';
}

/**
 * @param {Array} colorAssignments
 * @param {Array} colors
 * @return {Object} Object with 'colorIndex' and 'striped' properties.
 */
function getOpenColorInfo(colorAssignments, colors) {
  // First look for normal colors, then striped.
  var stripedStates = [false, true];
  for (var i = 0; i < stripedStates.length; i++) {
    var stripedState = stripedStates[i];
    var assignedColors = colorAssignments.filter(function(colorAssignment) {
      return colorAssignment.striped === stripedState && colorAssignment.colorIndex !== null;
    }).map(function(colorAssignment) {
      return colorAssignment.colorIndex;
    });
    if (assignedColors.length < colors.length) {
      for (var colorIndex = 0; colorIndex < colors.length; colorIndex++) {
        if (!(assignedColors.includes(colorIndex))) {
          return {
            colorIndex: colorIndex,
            striped: stripedState,
          }
        }
      }
    }
  }
  throw 'Could not find open color';
}

/**
 * @param {Array} colorAssignments
 * @return {Object|undefined} Color assignment object if found.
 */
function getAvailableColorAssignment(colorAssignments) {
  return colorAssignments.find(function(assignment) {
    return assignment.combination === null;
  });
}

/**
 * @param {Object} colorAssignment
 * @param {string} combination
 * @param {int} colorIndex
 * @param {boolean} striped
 */
function assignColor(colorAssignment, combination, colorIndex, striped) {
  colorAssignment.combination = combination;
  colorAssignment.colorIndex = colorIndex;
  colorAssignment.striped = striped;
  colorAssignment.readyForEviction = false;
}

/**
 * @param {int} colorIndex
 * @param {Array} colors
 * @return Color from a list
 */
function getColor(colorIndex, colors) {
  return '#' + colors[colorIndex];
}

/**
 * @param {string} color
 * @param {boolean} striped
 * @return Background color or pattern
 */
function getBackground(color, striped) {
  return striped ? getStripes(color) : color;
}

/**
 * @param {string} color
 * @return Canvas pattern from color
 */
function getStripes(color) {
  if (window.pattern && typeof window.pattern.draw === 'function') {
    return window.pattern.draw('diagonal', color);
  }
  return color;
}

/**
 * @param {boolean} striped
 * @return {Array|undefined} An array produces dashed lines on the chart
 */
function getBorderDash(striped) {
  return striped ? [5, 5] : undefined;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {Object} combination
 * @param {string} labelFallback
 * @param {string} color
 * @param {string} background
 * @param {Array} border
 * @param {Array} excess
 * @return {Object} Dataset object for Chart.js
 */
function makeDataset(years, rows, combination, labelFallback, color, background, border, excess, showLine, spanGaps, allObservationAttributes, mixedTypes) {
   var dataset = getBaseDataset(),
       prepared = prepareDataForDataset(years, rows, allObservationAttributes),
       data = prepared.data,
       obsAttributes = prepared.observationAttributes;
  return Object.assign(dataset, {
    label: getCombinationDescription(combination, labelFallback),
    combination: combination,
    type: getCombinationType(combination, labelFallback, mixedTypes),
    order: getCombinationType(combination, labelFallback, mixedTypes) == undefined ? 0 : 1,
    disaggregation: combination,
    borderColor: color,
    backgroundColor: background,
    pointBorderColor: color,
    pointBackgroundColor: background,
    borderDash: border,
    borderWidth: 2,
    headline: false,
    pointStyle: 'circle',
    data: data,
    excess: excess,
    spanGaps: spanGaps,
    showLine: showLine,
    observationAttributes: obsAttributes,
  });
}

/**
 * @return {Object} Starting point for a Chart.js dataset
 */
function getBaseDataset() {
  return Object.assign({}, {
    fill: false,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 1,
    tension: 0,
    spanGaps: true,
    showLine: true,
    maxBarThickness: 150,
    //type: 'x',
  });
}

/**
 * @param {Object} combination Key/value representation of a field combo
 * @param {string} fallback
 * @param {Array} mixedTypes objects containing field, value, type
 * @return {string} type of chart for the given combination
 */
function getCombinationType(combination, fallback, mixedTypes) {

  var combi = getCombinationDescription(combination, fallback);
  if (mixedTypes !== undefined && mixedTypes !== null){
    var values = mixedTypes.map(a => a.value);
    if (values.indexOf(combi) != -1) {
      return mixedTypes.find(function(item) {
        return getCombinationDescription([item.value],'') === combi;
      }).type;
    }
  }
  else {
    return '';
  }

}

/**
 * @param {Object} combination Key/value representation of a field combo
 * @param {string} fallback
 * @return {string} Human-readable description of combo
 */
function getCombinationDescription(combination, fallback) {
  //console.log("what does getCombinationDescp recive?", combination);
  var keys = Object.keys(combination);
  if (keys.length === 0) {
    return fallback;
  }
  return keys.map(function(key) {
    return translations.t(combination[key]);
  }).join(', ');
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @return {Array} Prepared rows
 */
 function prepareDataForDataset(years, rows, allObservationAttributes) {
   var ret = {
     data: [],
     observationAttributes: [],
   };
   var configObsAttributes = {{ site.observation_attributes | jsonify }};
   if (configObsAttributes && configObsAttributes.length > 0) {
     configObsAttributes = configObsAttributes.map(function(obsAtt) {
       return obsAtt.field;
     });
   }
   else {
     configObsAttributes = [];
   }
   years.forEach(function(year) {
    var found = rows.find(function (row) {
      return row[YEAR_COLUMN] === year;
    });
    ret.data.push(found ? found[VALUE_COLUMN] : null);

    var obsAttributesForRow = [];
    if (found) {
      configObsAttributes.forEach(function(field) {
        if (found[field]) {
          var hashKey = field + '|' + found[field];
          obsAttributesForRow.push(allObservationAttributes[hashKey]);
        }
      });
    }
    ret.observationAttributes.push(obsAttributesForRow);
  });
  return ret;
}

/**
 * @return {string} Hex number of headline color
 *
 * TODO: Make this dynamic to support high-contrast.
 */
function getHeadlineColor() {
  return HEADLINE_COLOR;
}

/**
 * @param {Array} years
 * @param {Array} rows
 * @param {string} label
 * @return {Object} Dataset object for Chart.js
 */
function makeHeadlineDataset(years, rows, label, showLine, spanGaps, colors, allObservationAttributes, mixedTypes) {
   var dataset = getBaseDataset(),
       prepared = prepareDataForDataset(years, rows, allObservationAttributes),
       data = prepared.data,
       obsAttributes = prepared.observationAttributes;
  return Object.assign(dataset, {
    label: label,
    // Override: no headline color
    borderColor: '#a9e13e',//getHeadlineColor(colors),
    backgroundColor: '#a9e13e',//getHeadlineColor(colors),
    pointBorderColor: '#a9e13e',//getHeadlineColor(colors),
    pointBackgroundColor: '#a9e13e',//getHeadlineColor(colors),
    borderWidth: 4,
    headline: true,
    pointStyle: 'circle',
    data: data,
    observationAttributes: obsAttributes,
    showLine: showLine,
    spanGaps: spanGaps,
    type: getCombinationType([], '', mixedTypes),
    order: getCombinationType([], '', mixedTypes) == '' ? 0 : 1,
  });
}

  /**
   * @param {Array} graphStepsize Objects containing 'unit' and 'title'
   * @param {String} selectedUnit
   * @param {String} selectedSeries
   */
  function getGraphStepsize(graphStepsize, selectedUnit, selectedSeries) {
    return getMatchByUnitSeries(graphStepsize, selectedUnit, selectedSeries);
}
