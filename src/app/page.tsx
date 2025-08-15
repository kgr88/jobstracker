'use client';
import { Button, Card, CardBody, CardHeader, Link } from '@heroui/react';
import { HomeIcon, CalendarDaysIcon, AdjustmentsHorizontalIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <div className="">
      <section className="flex flex-col justify-center items-center h-[60vh] ">
        <div className="leading-8 text-center md:leading-10 max-w-full md:max-w-[60vw]">
          <h1 className="tracking-tight inline font-semibold text-[clamp(1rem,10vw,2rem)] sm:text-[clamp(1rem,10vw,3rem)] lg:text-5xl text-center">
            Track applications, manage interviews, and keep everything in&nbsp;
          </h1>
          <h1 className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[clamp(1rem,10vw,2rem)] sm:text-[clamp(1rem,10vw,3rem)] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b text-center">
            one place.
          </h1>
        </div>
        <h2 className="w-full md:w-1/2 my-6 text-medium lg:text-large font-normal text-default-500 block max-w-full text-center md:max-w-[60vw]">
          JobsTracker is a web app that allows you to keep track of your job applications, upcoming interviews, and see
          your progress on a dashboard.
        </h2>
        <Button
          as={Link}
          href="/login"
          className="w-full md:max-w-[60vw] lg:max-w-[40vw] text-md py-6"
          radius="full"
          color="primary">
          Get Started<ArrowRightIcon className="size-4" />
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="flex gap-3">
            <div className="p-2 rounded-full items-center bg-secondary-100/80">
              <HomeIcon className="size-5 text-pink-500" />
            </div>
            <div>
              <p className="text-md font-semibold">Dashboard</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p>See recent applications, upcoming interviews, and check stats with a clean, intuitive dashboard.</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <div className="p-2 rounded-full items-center bg-secondary-100/80">
              <CalendarDaysIcon className="size-5 text-pink-500" />
            </div>
            <div>
              <p className="text-md font-semibold">Tracking</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p>
              Log every job application and interview in one place. No more scattered notes or forgotten follow-ups.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <div className="p-2 rounded-full items-center bg-secondary-100/80">
              <AdjustmentsHorizontalIcon className="size-5 text-pink-500" />
            </div>
            <div>
              <p className="text-md font-semibold">Sorting & Filtering</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p>Quickly find what you need with easy to use filtering and sorting tools.</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <div className="p-2 rounded-full items-center bg-secondary-100/80">
              <HomeIcon className="size-5 text-pink-500" />
            </div>
            <div>
              <p className="text-md font-semibold">Dark Theme</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p>Switch between light and dark themes anytime for a look that suits your preferences.</p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
