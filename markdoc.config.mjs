import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    tags: {
        callout: {
            render: component('./src/components/Callout.astro'),
            attributes: {
                type: {
                    type: String,
                    default: 'info',
                    matches: ['info', 'warning', 'danger'],
                },
            },
        },
        hero: {
            render: component('./src/components/Hero.astro'),
            attributes: {
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        },
    },
});