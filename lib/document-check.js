'use babel';

import DocumentCheckView from './document-check-view';
import { CompositeDisposable } from 'atom';

export default {

  documentCheckView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.documentCheckView = new DocumentCheckView(state.documentCheckViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.documentCheckView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'document-check:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.documentCheckView.destroy();
  },

  serialize() {
    return {
      documentCheckViewState: this.documentCheckView.serialize()
    };
  },

  toggle() {
    console.log('DocumentCheck was toggled2!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
