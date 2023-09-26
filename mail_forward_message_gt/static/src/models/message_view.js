/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {one} from '@mail/model/model_field';
import {clear} from '@mail/model/model_field_command';

registerPatch({
    name: 'MessageView',
    fields: {
        forwardMessageConfirmViewOwner: one('ForwardMessageConfirmView', {
            identifying: true,
            inverse: 'messageView',
        }),
        isActive: {
            compute() {
                return this._super() || Boolean(
                    this.messageActionList &&
                    this.messageActionList.actionForward &&
                    this.messageActionList.actionForward.messageActionView &&
                    this.messageActionList.actionForward.messageActionView.forwardConfirmDialog
                );
            }
        },
        messageActionList: {
            compute() {
                return this.forwardMessageConfirmViewOwner ? clear() : this._super();
            }
        },
        message: {
            compute() {
                if (this.forwardMessageConfirmViewOwner) {
                    return this.forwardMessageConfirmViewOwner.message;
                }
                return this._super();
            }
        }
    }
})