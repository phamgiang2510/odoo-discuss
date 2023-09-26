/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {one} from '@mail/model/model_field';

registerPatch({
    name: 'MessageActionView',
    recordMethods: {
        /**
         * @override
         */
        onClick(ev) {
            this._super();
            if (this.messageAction.messageActionListOwner === this.messageAction.messageActionListOwnerAsForward) {
                this.update({forwardConfirmDialog: {}});
            }
        }
    },
    fields: {
        classNames: {
            /**
             * @override
             */
            compute() {
                let classNames = this._super();
                if (this.messageAction.messageActionListOwner === this.messageAction.messageActionListOwnerAsForward) {
                    classNames = classNames + ' fa fa-lg fa-share o_MessageActionView_actionForward';
                }
                return classNames
            }
        },
        title: {
            /**
             * @override
             */
            compute() {
                if (this.messageAction.messageActionListOwner === this.messageAction.messageActionListOwnerAsForward) {
                    return this.env._t("Forward");
                }
                return this._super();
            }
        },
        forwardConfirmDialog: one('Dialog', {
            inverse: 'messageActionViewOwnerAsForwardConfirm',
        }),
    }
})
