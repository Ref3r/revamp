// app/components/LoginForm.tsx
'use client'
import { Button, Input, Label } from '@lemonsqueezy/wedges'
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold">Signup/Login</h1>
        </div>

        <form className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-[#FFFFFF] mb-2 block text-md">
              Username
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
              style={{
                boxShadow: '0 1px 2px 0 rgba(18, 18, 23, 0.05)'
              }}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[#FFFFFF] mb-2 block text-md">
              Password
            </Label>
            <Input
              type="password"
              placeholder="********"
              className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
              style={{
                boxShadow: '0 1px 2px 0 rgba(18, 18, 23, 0.05)'
              }}
            />
            <div className="mt-2">
              <span className="text-[#FFFFFF80]">Forgot Password? </span>
              <Button type="button" className="text-white">
                Click here
              </Button>
              <span className="text-[#FFFFFF80]"> to reset</span>
            </div>
          </div>

         <Link href="/create-profile"> <Button 
            variant="primary"
            className="w-full bg-[#00B24E] hover:bg-[#00A047] text-white py-3 rounded-lg"
            // onClick={() => router.push('/create-profile')}
          >
            Next
          </Button></Link>

          <div className="relative flex items-center justify-center gap-4 my-8">
            <div className="h-[1px] bg-[#FFFFFF4D] flex-1"/>
            <span className="text-[#FFFFFF]">Or</span>
            <div className="h-[1px] bg-[#FFFFFF4D] flex-1"/>
          </div>

          <Button
            variant="outline"
            className="w-full bg-[#0E0E0E border border-[#FFFFFF] text-white hover:bg-[#FFFFFF0D] py-2 flex items-center justify-center gap-3 rounded-lg"
          >
            <div className="flex gap-3">
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Google Sign-in</span>
            </div>
          </Button>
        </form>
      </div>
    </div>
  )
}