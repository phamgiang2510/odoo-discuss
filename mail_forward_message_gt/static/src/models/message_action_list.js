/** @odoo-module **/

import {registerPatch} from '@mail/model/model_core';
import {one} from '@mail/model/model_field';
import {clear} from '@mail/model/model_field_command';

registerPatch({
    name: 'MessageActionList',
    fields: {
        actionForward: one('MessageAction', {
            compute() {
                if (this.message && this.message.canBeForwarded) {
                    return {};
                }
                return clear();
            },
            inverse: 'messageActionListOwnerAsForward',
        }),
    }
})
