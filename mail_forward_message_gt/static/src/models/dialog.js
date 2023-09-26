/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {one} from '@mail/model/model_field';
import {clear} from '@mail/model/model_field_command';

registerPatch({
    name: 'Dialog',
    fields: {
        messageActionViewOwnerAsForwardConfirm: one('MessageActionView', {
            identifying: true,
            inverse: 'forwardConfirmDialog',
        }),
        forwardMessageConfirmView: one('ForwardMessageConfirmView', {
            compute() {
                return this.messageActionViewOwnerAsForwardConfirm ? {} : clear();
            },
            inverse: 'dialogOwner',
        }),
        componentClassName: {
            /**
             * @override
             */
            compute() {
                if (this.forwardMessageConfirmView) {
                    return 'o_Dialog_componentLargeSize align-self-start mt-5';
                }
                return this._super();
            }
        },
        componentName: {
            /**
             * @override
             */
            compute() {
                if (this.forwardMessageConfirmView) {
                    return 'ForwardMessageConfirm';
                }
                return this._super();
            }
        },
        record: {
            /**
             * @override
             */
            compute() {
                if (this.forwardMessageConfirmView) {
                    return this.forwardMessageConfirmView;
                }
                return this._super();
            },
        }
    }
})
