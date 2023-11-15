import * as trpc from '@trpc/server';
import { UserType } from '@prisma/client';
import { type SignedInAuthObject } from '@clerk/nextjs/server';
import { describe, expect, test, vi, beforeEach, it } from 'vitest';

import { adminProcedure } from '@/server/procedures';
import { createContextInner } from '@/server/trpc';
import AppRouter, { type TAppRouter } from '@/server/routers/_app';
import MockPrismaInstance from '@/utils/__mocks__/helpers/clients/prisma.client';

vi.mock('@/utils/helpers/getCurrentUser', () => vi.fn());

describe('Procedures', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const session: SignedInAuthObject = {
    user: {
      id: '1',
      backupCodeEnabled: false,
      passwordEnabled: false,
      totpEnabled: false,
      twoFactorEnabled: false,
      banned: false,
      createdAt: 0,
      updatedAt: 0,
      gender: '',
      profileImageUrl: '',
      imageUrl: '',
      hasImage: false,
      birthday: '',
      primaryEmailAddressId: null,
      primaryPhoneNumberId: null,
      primaryWeb3WalletId: null,
      lastSignInAt: null,
      externalId: null,
      username: null,
      firstName: null,
      lastName: null,
      publicMetadata: {},
      privateMetadata: {},
      unsafeMetadata: {},
      emailAddresses: [{
        id: '1',
        emailAddress: '',
        verification: {
          status: 'verified',
          strategy: 'email',
          externalVerificationRedirectURL: null,
          attempts: 0,
          expireAt: 0,
          nonce: '',
        },
        linkedTo: [],
      }],
      phoneNumbers: [],
      web3Wallets: [],
      externalAccounts: [],
    },
  };

  describe('checkIfUserIsLoggedIn', () => {
    test('should throw an error if user is not logged in', async () => {
      const getCurrentUser = vi.fn().mockReturnValue(null);
      getCurrentUser();

      const opts = {
        next: vi.fn(),
      };

      const userProcedure = vi.fn().mockImplementation(() => userProcedure);

      await expect(userProcedure).rejects.toThrow(
        new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to perform this action.',
        }),
      );

      expect(opts.next).not.toHaveBeenCalled();
    });

    test('should call next with the correct context if user is logged in', async () => {
      const user = { id: 1 };
      const getCurrentUser = vi.fn().mockReturnValue(user);
      getCurrentUser();

      const opts = {
        next: vi.fn(),
      };

      await expect(userProcedure).resolves.toBeUndefined();

      expect(opts.next).toHaveBeenCalledWith({
        ctx: {
          session: {
            user,
          },
        },
      });
    });
  });
});

describe('adminProcedure', () => {
  test('should throw an error if user is not an admin', async () => {
    const next = vi.fn();

    await expect(adminProcedure).rejects.toThrow(
      new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be an admin to perform this action.',
      }),
    );

    expect(next).not.toHaveBeenCalled();
  });

  test('should call next with the correct context if user is an admin', async () => {
    const userType = UserType.Admin;

    const ctx = {
      prisma: {
        clerkUserReference: {
          findFirst: vi.fn().mockResolvedValue({ userType }),
        },
      },
      session: {
        user: { id: 1 },
      },
    };
    const next = vi.fn();

    expect(next).toHaveBeenCalledWith({ ctx });
  });
});
