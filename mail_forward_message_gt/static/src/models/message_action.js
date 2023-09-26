/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {one} from '@mail/model/model_field';

registerPatch({
    name: 'MessageAction',
    fields: {
        messageActionListOwnerAsForward: one('MessageActionList', {
            identifying: true,
            inverse: 'actionForward',
        }),
        messageActionListOwner: {
            /**
             * @override
             */
            compute() {
                if (this.messageActionListOwnerAsForward) {
                    return this.messageActionListOwnerAsForward;
                }
                return this._super();
            }
        },
        sequence: {
            /**
             * @override
             */
            compute() {
                if (this.messageActionListOwnerAsForward) {
                    return 2.5;
                }
                return this._super();
            }
        }
    }
})
