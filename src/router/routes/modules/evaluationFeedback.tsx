import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const IndicatorChangeApplicationPage = lazy(
  () => import('@/pages/evaluation-feedback/evaluationIndexLibrary/indicatorChangeApplication'),
);
const IndicatorChangeApplicationDetail = lazy(
  () =>
    import('@/pages/evaluation-feedback/evaluationIndexLibrary/indicatorChangeApplication/detail'),
);
const management: AppRouteObject = {
  order: 7,
  path: 'evaluation-feedback',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.evaluation',
    icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,
    key: '/evaluation-feedback',
  },
  children: [
    {
      index: true,
      element: <Navigate to="evaluationIndexLibrary" replace />,
    },
    {
      path: 'evaluationIndexLibrary',
      meta: {
        label: 'sys.menu.evaluation.evaluationIndexLibrary',
        key: '/evaluation-feedback/evaluationIndexLibrary',
      },
      children: [
        {
          index: true,
          element: <Navigate to="indicatorChangeApplication" replace />,
        },
        {
          path: 'indicatorChangeApplication',
          element: <IndicatorChangeApplicationPage />,
          meta: {
            label: 'sys.menu.user.indicatorChangeApplication',
            key: '/management/evaluationIndexLibrary/indicatorChangeApplication',
            disabled: true,
          },
        },
        {
          path: 'indicatorChangeApplicationDetail',
          element: <IndicatorChangeApplicationDetail />,
          meta: {
            label: 'sys.menu.user.indicatorChangeApplication',
            key: '/management/evaluationIndexLibrary/indicatorChangeApplication/detail',
            hideMenu: false,
          },
        },
      ],
    },
  ],
};

export default management;
