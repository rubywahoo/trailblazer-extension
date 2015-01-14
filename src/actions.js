var constants       = require('./constants')
  , info            = require('debug')('actions.js:info')
  , messageChannel  = require('app/message-channel');

module.exports = {

  requestAssignments: function () {
    info('requestAssignments');
    messageChannel.send({ action: constants.REQUEST_ASSIGNMENTS });
  },

  fetchAssignments: function () {
    info('fetchAssignments');
    messageChannel.send({ action: constants.FETCH_ASSIGNMENTS });
  },

  fetchAssignmentsSuccess: function (assignments) {
    info('fetchAssignmentsSuccess');
    messageChannel.send({ action: constants.FETCH_ASSIGNMENTS_SUCCESS, payload: { assignments: assignments } });
  },

  fetchAssignmentsFail: function (error) {
    info('fetchAssignmentsFail');
    messageChannel.send({ action: constants.FETCH_ASSIGNMENTS_FAIL, payload: { error: error } });
  },

  updateAssignmentCache: function (assignments) {
    info('updateAssignmentCache');
    messageChannel.send({ action: constants.UPDATE_ASSIGNMENT_CACHE, payload: { assignments: assignments } });
  },

  updateAssignmentCacheSuccess: function () {
    info('updateAssignmentCacheSuccess');
    messageChannel.send({ action: constants.UPDATE_ASSIGNMENT_CACHE_SUCCESS });
  },

  updateAssignmentCacheFail: function (error) {
    info('updateAssignmentCacheFail', {error: error });
    messageChannel.send({ action: constants.UPDATE_ASSIGNMENT_CACHE_FAIL, payload: { error: error } });
  },

  updateAssignmentTitle: function (localId, title) {
    info('updateAssignmentTitle', { localId: localId, title: title });
    messageChannel.send({
      action: constants.UPDATE_ASSIGNMENT_TITLE,
      payload: {
        localId: localId,
        title: title
      }
    });
  },

  assignmentsSynchronized: function () {
    info('assignmentsSynchronized');
    messageChannel.send({ action: constants.ASSIGNMENTS_SYNCHRONIZED });
  },

  createAssignmentSuccess: function (assignment) {
    info('createAssignmentSuccess');
    messageChannel.send({
      action: constants.CREATE_ASSIGNMENT_SUCCESS,
      payload: {
        assignment: assignment
      }
    });
  },

  destroyAssignment: function (localId) {
    info('destroyAssignment');
    messageChannel.send({
      action: constants.DESTROY_ASSIGNMENT,
      payload: {
        localId: localId
      }
    });
  },

  requestNodes: function (localAssignmentId) {
    info('requestNodes');
    messageChannel.send({
      action: constants.REQUEST_NODES,
      payload: {
        localAssignmentId: localAssignmentId
      }
    });
  },

  fetchNodes: function (assignmentId) {
    info('fetchNodes');
    messageChannel.send({
      action: constants.FETCH_NODES,
      payload: {
        assignmentId: assignmentId
      }
    });
  },

  fetchNodesSuccess: function (assignmentId, nodes) {
    info('fetchNodesSuccess');
    messageChannel.send({
      action: constants.FETCH_NODES_SUCCESS,
      payload: {
        nodes: nodes,
        assignmentId: assignmentId
      }
    });
  },

  fetchNodesFail: function (error) {
    info('fetchNodesFail');
    messageChannel.send({ action: constants.FETCH_NODES_FAIL, payload: { error: error } });
  },

  updateNodeCache: function (assignmentId, nodes) {
    info('updateNodeCache');
    messageChannel.send({
      action: constants.UPDATE_NODE_CACHE,
      payload: {
        nodes: nodes,
        assignmentId: assignmentId
      }
    });
  },

  updateNodeCacheSuccess: function (assignment) {
    info('updateNodeCacheSuccess');
    messageChannel.send({
      action: constants.UPDATE_NODE_CACHE_SUCCESS,
      payload: {
        assignment: assignment
      }
    });
  },

  updateNodeCacheFail: function (error) {
    info('updateNodeCacheFail');
    messageChannel.send({ action: constants.UPDATE_NODE_CACHE_FAIL, payload: { error: error } });
  },

  nodesSynchronized: function (assignment) {
    info('nodesSynchronized');
    messageChannel.send({
      action: constants.NODES_SYNCHRONIZED,
      payload: {
        assignment: assignment
      }
    });
  },


  createNodeSuccess: function (node) {
    info('createNodeSuccess');
    chrome.runtime.sendMessage({
      action: constants.CREATE_NODE_SUCCESS,
      payload: {
        node: node
      }
    });
  },

  tabCreated: function(tabId, url, title, parentTabId, tabObj) {
    info('tabCreated');
    messageChannel.send({
      action: constants.TAB_CREATED,
      payload: {
        tabId: tabId,
        url: url,
        title: title,
        parentTabId: parentTabId,
        tabObj: tabObj
      }
    });
  },

  tabFocused: function(tabId) {
    info('tabFocused');
    messageChannel.send({
      action: constants.TAB_FOCUSED,
      payload: {
        tabId: tabId
      }
    });
  },

  createdNavigationTarget: function(parentTabId, tabId, url, timestamp) {
    info('createdNavigationTarget');
    chrome.tabs.get(tabId, function(tabObj) {
      messageChannel.send({
        action: constants.CREATED_NAVIGATION_TARGET,
        payload: {
          parentTabId: parentTabId,
          tabId: tabId,
          url: url,
          timestamp: timestamp,
          tabObj: tabObj
        }
      });
    });
  },

  tabUpdated: function(tabId, url, title, tabObj) {
    info('tabUpdated');
    messageChannel.send({
      action: constants.TAB_UPDATED,
      payload: {
        tabId: tabId,
        url: url,
        title: title,
        tabObj: tabObj
      }
    });
  },

  historyStateUpdated: function(tabId, url, transitionType, transitionQualifiers, timestamp) {
    info('historyStateUpdated');
    chrome.tabs.get(tabId, function(tabObj) {
      messageChannel.send({
        action: constants.HISTORY_STATE_UPDATED,
        payload: {
          tabId: tabId,
          url: url,
          transitionType: transitionType,
          transitionQualifiers: transitionQualifiers,
          timestamp: timestamp,
          tabObj: tabObj
        }
      });
    });
  },

  webNavCommitted: function(tabId, url, transitionType, transitionQualifiers, timestamp) {
    info('webNavCommitted');
    chrome.tabs.get(tabId, function(tabObj) {
      if (chrome.runtime.lastError) {
        info('webNavCommitted: No tab with that id - assuming background web request and ignoring');
      } else {
        messageChannel.send({
          action: constants.WEB_NAV_COMMITTED,
          payload: {
            tabId: tabId,
            url: url,
            transitionType: transitionType,
            transitionQualifiers: transitionQualifiers,
            timestamp: timestamp,
            tabObj: tabObj
          }
        });
      }
    });
  },

  tabClosed: function(tabId) {
    info('tabClosed');
    messageChannel.send({ action: constants.TAB_CLOSED, payload: { tabId: tabId } });
  },

  tabReplaced: function(newTabId, oldTabId) {
    info('tabReplaced');
    messageChannel.send({
      action: constants.TAB_REPLACED,
      payload: {
        oldTabId: oldTabId,
        newTabId: newTabId
      }
    });
  },

  //UI ACTIONS. Dispatch is overwritten in UI and passes a message through runtime
  //which then calls the *same* method in background. [Mind Blown]
  selectAssignment: function (assignmentId) {
    info('selectAssignment');
    messageChannel.send({ action: constants.SELECT_ASSIGNMENT, payload: { assignmentId: assignmentId } });
  },

  requestTabState: function (tabId) {
    info('requestTabState');
    messageChannel.send({
      action: constants.REQUEST_TAB_STATE,
      payload: {
        tabId: tabId
      }
    });
  },

  requestTabStateResponse: function (tabId, state) {
    info('requestTabStateResponse');
    messageChannel.send({
      action: constants.REQUEST_TAB_STATE_RESPONSE,
      payload: {
        tabId: tabId,
        state: state
      }
    });
  },

  startRecording: function (tabId, tabObj) {
    info('startRecording');
    messageChannel.send({
      action: constants.START_RECORDING,
      payload: {
        tabId: tabId,
        tabObj: tabObj
      }
    });
  },

  startRecordingSuccess: function (tabId) {
    info('startRecordingSuccess');
    messageChannel.send({
      action: constants.START_RECORDING_SUCCESS,
      payload: {
        tabId: tabId
      }
    });
  },

  startRecordingFail: function (tabId) {
    info('startRecordingFail');
    messageChannel.send({
      action: constants.START_RECORDING_FAIL,
      payload: {
        tabId: tabId
      }
    });
  },

  resumeRecording: function (localId, focus) {
    info('startRecording');
    messageChannel.send({
      action: constants.RESUME_RECORDING,
      payload: {
        localId: localId,
        focus: focus
      }
    });
  },

  resumeRecordingFail: function (localId) {
    info('startRecordingFail');
    messageChannel.send({
      action: constants.RESUME_RECORDING_FAIL,
      payload: {
        localId: localId
      }
    });
  },

  stopRecording: function (tabId) {
    info('stopRecording');
    messageChannel.send({
      action: constants.STOP_RECORDING,
      payload: {
        tabId: tabId
      }
    });
  },

  stopRecordingSuccess: function (tabId) {
    info('stopRecordingSuccess');
    messageChannel.send({
      action: constants.STOP_RECORDING_SUCCESS,
      payload: {
        tabId: tabId
      }
    });
  },

  rankNodeWaypoint: function (localId) {
    info('rankNodeWaypoint');
    messageChannel.send({
      action: constants.RANK_NODE_WAYPOINT,
      payload: {
        localId: localId
      }
    });
  },

  rankNodeNeutral: function (localId) {
    info('rankNodeNeutral');
    messageChannel.send({
      action: constants.RANK_NODE_NEUTRAL,
      payload: {
        localId: localId
      }
    });
  },

  signIn: function () {
    info('signIn');
    messageChannel.send({
      action: constants.SIGN_IN
    });
  },

  signOut: function () {
    info('signOut');
    messageChannel.send({
      action: constants.SIGN_OUT
    });
  },

  shareAssignment: function (localId) {
    info('shareAssignment', { localId: localId });
  },

  persistAssignment: function (localId) {
    info('persistAssignment', { localId: localId });
    messageChannel.send({
      action: constants.PERSIST_ASSIGNMENT,
      payload: {
        localId: localId
      }
    });
  },

  persistAssignmentSuccess: function (localId) {
    info('persistAssignmentSuccess', { localId: localId });
    messageChannel.send({
      action: constants.PERSIST_ASSIGNMENT_SUCCESS,
      payload: {
        localId: localId
      }
    });
  },

  persistNode: function (localId) {
    info('persistNode', { localId: localId });
    messageChannel.send({
      action: constants.PERSIST_NODE,
      payload: {
        localId: localId
      }
    });
  },

  persistNodeSuccess: function (localId) {
    info('persistNodeSuccess', { localId: localId });
    messageChannel.send({
      action: constants.PERSIST_NODE_SUCCESS,
      payload: {
        localId: localId
      }
    });
  }
}
