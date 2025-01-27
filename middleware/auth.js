export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user').value;

  // Redirect to login if user is not logged in
  if (!user) {
    alert('You must be logged in to access this page.');
    return navigateTo('/');
  }

  // Check for role-based access if specified
  if (to.meta.role && !to.meta.role.includes(user.role)) {
    alert('You do not have permission to access this page.');
    return navigateTo('/');
  }
});
