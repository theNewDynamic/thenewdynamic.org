/**
 * This script is taken from:
 * https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget
 */

if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', function(user) {
        if (!user) {
            window.netlifyIdentity.on('login', function() {
                document.location.href = '/admin/';
            });
        }
    });
}
