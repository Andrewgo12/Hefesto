<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class LoginAttempt extends Model
{
    protected $fillable = [
        'email',
        'ip_address',
        'successful',
        'attempted_at',
        'blocked_until',
        'user_agent',
    ];

    protected $casts = [
        'successful' => 'boolean',
        'attempted_at' => 'datetime',
        'blocked_until' => 'datetime',
    ];

    /**
     * Registrar un intento de login
     */
    public static function recordAttempt(string $email, string $ipAddress, bool $successful, ?string $userAgent = null): void
    {
        self::create([
            'email' => $email,
            'ip_address' => $ipAddress,
            'successful' => $successful,
            'attempted_at' => now(),
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * Verificar si una cuenta está bloqueada
     */
    public static function isBlocked(string $email): array
    {
        $latestBlock = self::where('email', $email)
            ->where('blocked_until', '>', now())
            ->orderBy('blocked_until', 'desc')
            ->first();

        if ($latestBlock) {
            $minutesRemaining = now()->diffInMinutes($latestBlock->blocked_until);
            return [
                'blocked' => true,
                'until' => $latestBlock->blocked_until,
                'minutes_remaining' => $minutesRemaining,
            ];
        }

        return ['blocked' => false];
    }

    /**
     * Contar intentos fallidos en los últimos X minutos
     */
    public static function getRecentFailedAttempts(string $email, int $minutes = 15): int
    {
        return self::where('email', $email)
            ->where('successful', false)
            ->where('attempted_at', '>=', now()->subMinutes($minutes))
            ->count();
    }

    /**
     * Bloquear cuenta temporalmente
     */
    public static function blockAccount(string $email, int $minutes = 15): void
    {
        self::create([
            'email' => $email,
            'ip_address' => request()->ip(),
            'successful' => false,
            'attempted_at' => now(),
            'blocked_until' => now()->addMinutes($minutes),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Limpiar intentos fallidos después de login exitoso
     */
    public static function clearFailedAttempts(string $email): void
    {
        self::where('email', $email)
            ->where('successful', false)
            ->where('attempted_at', '>=', now()->subHours(24))
            ->delete();
    }

    /**
     * Limpiar bloqueos expirados (ejecutar con cron)
     */
    public static function cleanExpiredBlocks(): int
    {
        return self::where('blocked_until', '<', now())
            ->whereNotNull('blocked_until')
            ->delete();
    }
}
